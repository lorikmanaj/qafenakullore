using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Api.Interfaces.Token;
using CSharpFunctionalExtensions;
using Domain.Models;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Api.Implementations.Token;

public class TokenValidator : ITokenValidator
{
    private readonly ApplicationDbContext _dbContext;
    private readonly JwtSecurityTokenHandler _handler;
    private readonly TokenValidationParameters _validationParameters;

    public TokenValidator(ApplicationDbContext dbContext, TokenValidationParameters validationParameters)
    {
        _dbContext = dbContext;
        _handler = new JwtSecurityTokenHandler();
        _validationParameters = validationParameters;
    }

    public async Task<Result> ValidateAsync(string token, string refreshToken) => await TryValidateTokenAsync(token, refreshToken);

    private async Task<Result> TryValidateTokenAsync(string token, string refreshToken)
    {
        try
        {
            // Validation 1 - using the TokenValidationParameters
            var tokenInVerification = _handler.ValidateToken(token, _validationParameters, out var validatedToken);

            // Validation 2 - check if is JwtSecurityToken
            if (validatedToken is not JwtSecurityToken jwtSecurityToken)
                return Result.Failure("Token is not a JwtSecurityToken");

            // Validation 3 - validate encryption
            if (!IsSecurityAlgorithmValid(jwtSecurityToken))
                return Result.Failure("Token algorithms does not matched");

            // Validation 4 - db check
            var existingRefreshToken = await GetPersistedToken(refreshToken);
            if (existingRefreshToken is null)
                return Result.Failure("Token does not exist in the database");

            // Validation 5 - if was already used
            if (existingRefreshToken.IsUsed)
                return Result.Failure("Token has been used");

            // Validation 6 - if was already revoked
            if (existingRefreshToken.IsRevoked)
                return Result.Failure("Token has been revoked");

            // Validation 7 - validated the jwt id  
            var jtiId = GetJwtId(tokenInVerification);
            if (!IsValidJwtId(jtiId, existingRefreshToken))
                return Result.Failure("Jwt id Token does not matched");

            return Result.Success();
        }
        catch (Exception e)
        {
            return Result.Failure(e.Message);
        }
    }

    private static bool IsSecurityAlgorithmValid(JwtSecurityToken jwtSecurityToken) => jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCulture);

    private static DateTime UnixTimeSpampToDateTime(long utcExpirityDate)
    {
        var starterDate = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

        return starterDate.AddSeconds(utcExpirityDate).ToLocalTime();
    }

    private async Task<RefreshToken> GetPersistedToken(string refreshToken)
    {
        return await _dbContext.RefreshTokens.FirstOrDefaultAsync(t => t.Value == refreshToken);
    }

    private static string GetJwtId(ClaimsPrincipal tokenInVerification)
    {
        var jtiClaim = tokenInVerification.Claims.FirstOrDefault(x => x.Type == Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Jti);
        if (jtiClaim == null)
            return string.Empty;

        return jtiClaim.Value;
    }

    private static bool IsValidJwtId(string jtiId, RefreshToken refreshToken)
    {
        return !string.IsNullOrEmpty(jtiId) && refreshToken.JwtId == jtiId;
    }

    public bool IsExpired(string token)
    {
        var tokenInVerification = _handler.ValidateToken(token, _validationParameters, out _);
        return IsExpired(tokenInVerification);
    }

    private static bool IsExpired(ClaimsPrincipal tokenInVerification)
    {
        var expiryClaim = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp)?.Value;
        if (string.IsNullOrEmpty(expiryClaim))
            return true;

        var utcExpiryDate = long.Parse(expiryClaim);
        var expiryDateTime = UnixTimeSpampToDateTime(utcExpiryDate);

        return DateTime.Now > expiryDateTime;
    }
}