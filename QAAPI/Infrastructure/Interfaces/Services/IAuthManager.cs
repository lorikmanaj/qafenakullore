using Domain.Dtos.Requests;
using Domain.Dtos.Responses;

namespace Infrastructure.Interfaces.Services
{
    public interface IAuthManager
    {
        Task<AuthResult> Register(UserRegistrationRequest request);
        Task<AuthResult> Login(UserLoginRequest request);
        Task<AuthResult> UpdateToken(NewTokenRequest request);
        //Task<AuthResult> GenerateTokenResult(IdentityUser user);
    }
}
