using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Interfaces.Services
{
    public interface IUserService
    {
        Task<IdentityUser> GetUserByIdAsync(string userId);
        Task<IdentityUser> GetLoggedInUser();
    }
}
