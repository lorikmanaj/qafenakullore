using Microsoft.AspNetCore.Identity;
using QafenAkullAPI.Core.DTO;

namespace QafenAkullAPI.Core.Interfaces.Services
{
    public interface IAuthManager
    {
        Task<IEnumerable<IdentityError>> Register(ApiUserDTO user);
        Task<bool> Login(LoginDTO login);
    }
}
