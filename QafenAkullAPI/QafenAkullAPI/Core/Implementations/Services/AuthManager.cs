using Microsoft.AspNetCore.Identity;
using QafenAkullAPI.Core.DTO;
using QafenAkullAPI.Core.Interfaces.Services;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Implementations.Services
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<ApiUser> _userManager;
        private ApiUser _user;

        public AuthManager(UserManager<ApiUser> userManager)
        {
            this._userManager = userManager;
        }

        public async Task<IEnumerable<IdentityError>> Register(ApiUserDTO user)
        {
            var newUser = new ApiUser()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                NormalizedEmail = user.Email,
                UserName = user.Email
            };

            var result = await _userManager.CreateAsync(newUser, user.Password);

            if (result.Succeeded)
                await _userManager.AddToRoleAsync(newUser, "User");

            return result.Errors;
        }

        public async Task<bool> Login(LoginDTO login)
        {
            _user = await _userManager.FindByEmailAsync(login.Email);
            
            if (_user is null)
                return default;
            
            bool isValidCredentials = await _userManager.CheckPasswordAsync(_user, login.Password);

            if (!isValidCredentials)
                return default;

            return true;
        }
    }
}
//public string FirstName { get; set; }
//public string LastName { get; set; }
//public string Email { get; set; }
//public string Password { get; set; }
