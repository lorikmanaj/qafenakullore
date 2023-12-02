using Api.Interfaces.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Application.Implementations.Repositories
{
    //Fix user service
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserRepository(UserManager<IdentityUser> userManager,
            IHttpContextAccessor httpContextAccessor)
        {
            this._userManager = userManager;
            this._httpContextAccessor = httpContextAccessor;
        }

        public async Task<IdentityUser> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null || user.Id != userId) return null;

            return user;
        }

        public async Task<IdentityUser> GetLoggedInUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) return null;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return null;

            return user;
        }
    }
}
