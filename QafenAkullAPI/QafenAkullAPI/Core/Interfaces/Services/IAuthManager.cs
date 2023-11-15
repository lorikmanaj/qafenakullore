using Microsoft.AspNetCore.Identity;
using QafenAkullAPI.Core.DTO;
using QafenAkullAPI.Core.DTO.ResponseModels;
using QafenAkullAPI.Core.DTO.User;

namespace QafenAkullAPI.Core.Interfaces.Services
{
    public interface IAuthManager
    {
        Task<IEnumerable<IdentityError>> Register(UserDTO user);
        Task<AuthResponse> Login(LoginDTO login);
        //Task<string> CreateRefreshToken();
        Task<AuthResponse> VerifyRefreshToken(AuthResponse request);
    }
}
