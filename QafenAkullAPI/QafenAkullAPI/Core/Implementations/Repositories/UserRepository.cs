using Microsoft.AspNetCore.Identity;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using System.Security.Claims;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserRepository(UserManager<ApiUser> userManager,
            IHttpContextAccessor httpContextAccessor)
        {
            this._userManager = userManager;   
            this._httpContextAccessor = httpContextAccessor;
        }

        public async Task<ApiUser> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null || user.Id != userId) return null;

            return user;
        }

        public async Task<ApiUser> GetLoggedInUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) return null;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return null;

            return user;
        }
    }
}
