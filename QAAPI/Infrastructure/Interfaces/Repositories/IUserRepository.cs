using Microsoft.AspNetCore.Identity;

namespace Api.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<IdentityUser> GetUserByIdAsync(string userId);
        Task<IdentityUser> GetLoggedInUser();
    }
}
