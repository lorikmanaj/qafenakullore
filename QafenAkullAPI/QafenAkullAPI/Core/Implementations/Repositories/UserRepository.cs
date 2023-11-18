using Microsoft.AspNetCore.Identity;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApiUser> _userManager;

        public UserRepository(UserManager<ApiUser> userManager)
        {
            this._userManager = userManager;   
        }

        public async Task<ApiUser> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null || user.Id != userId) return null;

            return user;
        }
    }
}
