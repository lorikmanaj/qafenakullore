using CSharpFunctionalExtensions;

namespace Api.Interfaces.Token;

public interface ITokenValidator
{
    Task<Result> ValidateAsync(string token, string refreshToken);
    bool IsExpired(string token);
}