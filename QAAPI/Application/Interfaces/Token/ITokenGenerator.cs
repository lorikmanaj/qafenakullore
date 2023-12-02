using CSharpFunctionalExtensions;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Api.Interfaces.Token;

public interface ITokenGenerator
{
    Task<Result> Generate(IdentityUser user);

    SecurityToken SecurityToken { get; }
    string AccessToken { get; }
    RefreshToken RefreshToken { get; }
}