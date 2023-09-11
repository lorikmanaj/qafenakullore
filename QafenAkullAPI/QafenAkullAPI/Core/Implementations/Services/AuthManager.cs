using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using QafenAkullAPI.Core.DTO;
using QafenAkullAPI.Core.DTO.ResponseModels;
using QafenAkullAPI.Core.Interfaces.Services;
using QafenAkullAPI.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QafenAkullAPI.Core.Implementations.Services
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly IConfiguration _configuration;
        private ApiUser _user;

        public AuthManager(UserManager<ApiUser> userManager, IConfiguration configuration)
        {
            this._userManager = userManager;
            this._configuration = configuration;
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

        public async Task<AuthResponse> Login(LoginDTO login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            bool isValidUser = await _userManager.CheckPasswordAsync(user, login.Password);

            var token = await GenerateToken(user);
            return new AuthResponse
            {
                Token = token,
                UserId = user.Id,
            };
        }

        private async Task<string> GenerateToken(ApiUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = roles.Select(_ => new Claim(ClaimTypes.Role, _)).ToList();
        
            var userClaims = await _userManager.GetClaimsAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims).Union(roleClaims);

            var token = new JwtSecurityToken(
                    issuer: _configuration["JwtSettings:Issuer"],
                    audience: _configuration["JwtSettings:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["JwtSettings:DurationInMinutes"])),
                    signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
//public string FirstName { get; set; }
//public string LastName { get; set; }
//public string Email { get; set; }
//public string Password { get; set; }
