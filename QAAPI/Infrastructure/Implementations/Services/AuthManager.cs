using Api.Interfaces.Services;
using Api.Interfaces.Token;
using Domain.Dtos.Requests;
using Domain.Dtos.Responses;
using Domain.Models;
using Infrastructure.Database;
using Infrastructure.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Implementations.Services
{
    public class AuthManager : IAuthManager
    {
        //
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private IdentityUser _user;
        private readonly IShoppingService _shoppingService;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly ITokenValidator _tokenValidator;

        public AuthManager(ApplicationDbContext context,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration,
            IShoppingService shoppingService,
            ITokenGenerator tokenGenerator,
            ITokenValidator tokenValidator)
        {
            this._context = context;
            this._userManager = userManager;
            this._configuration = configuration;
            this._shoppingService = shoppingService;
            this._tokenGenerator = tokenGenerator;
            this._tokenValidator = tokenValidator;
        }

        public async Task<AuthResult> Register(UserRegistrationRequest request)
        {
            if (_userManager == null || _tokenGenerator == null)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "UserManager or TokenGenerator is not available" }
                };
            }

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "Email already in use" }
                };
            }

            var user = new IdentityUser { UserName = request.Email, Email = request.Email };
            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = result.Errors.Select(x => x.Description).ToList()
                };
            }

            var roleResult = await _userManager.AddToRoleAsync(user, RoleType.User);

            if (!roleResult.Succeeded)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = roleResult.Errors.Select(e => e.Description).ToList()
                };
            }

            await _shoppingService.CreateCartForUser(user.Id);
            await _shoppingService.CreateWishlistForUser(user.Id);

            var authResult = await GenerateTokenResult(user);

            return authResult;
        }

        public async Task<AuthResult> Login(UserLoginRequest request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser == null)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "Invalid login request" }
                };
            }

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(existingUser, request.Password);
            if (!isPasswordCorrect)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "Invalid login request" }
                };
            }

            var authResult = await GenerateTokenResult(existingUser);

            this._user = existingUser;

            return authResult;
        }

        public async Task<AuthResult> UpdateToken(NewTokenRequest request)
        {
            // ... (validation logic)

            // Expired
            var isTokenExpired = _tokenValidator.IsExpired(request.Token);
            if (!isTokenExpired)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "Token can not be renewed because it is not expired. Only expired tokens can be renewed" }
                };
            }

            // Update current token as USED
            var existingRefreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Value == request.RefreshToken);
            existingRefreshToken.IsUsed = true;

            _context.RefreshTokens.Update(existingRefreshToken);

            var existingUser = await _userManager.FindByIdAsync(existingRefreshToken.UserId);
            if (existingUser == null)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "User stored in token is not valid" }
                };
            }

            var authResult = await GenerateTokenResult(existingUser);

            return authResult;
        }

        private async Task<AuthResult> GenerateTokenResult(IdentityUser user)
        {
            var tokenResult = await _tokenGenerator.Generate(user);

            if (tokenResult.IsFailure)
            {
                return new AuthResult
                {
                    Success = false,
                    Errors = new List<string> { "Not possible to generate a new token" }
                };
            }

            var token = _tokenGenerator.AccessToken;
            var refreshToken = _tokenGenerator.RefreshToken;

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            var authResult = new AuthResult
            {
                Token = token,
                RefreshToken = refreshToken.Value,
                Success = true
            };

            return authResult;
        }
    }
}
