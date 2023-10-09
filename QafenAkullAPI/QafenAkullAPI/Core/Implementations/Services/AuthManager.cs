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

        private const string _loginProvider = "QafenAkullAPI";
        private const string _refreshToken = "RefreshToken";

        public AuthManager(UserManager<ApiUser> userManager, IConfiguration configuration)
        {
            this._userManager = userManager;
            this._configuration = configuration;
        }

        public async Task<IEnumerable<IdentityError>> Register(ApiUserDTO user)
        {
            _user = new ApiUser()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                NormalizedEmail = user.Email,
                UserName = user.Email
            };

            var result = await _userManager.CreateAsync(_user, user.Password);

            if (result.Succeeded)
                await _userManager.AddToRoleAsync(_user, "User");

            return result.Errors;
        }

        public async Task<AuthResponse> Login(LoginDTO login)
        {
            _user = await _userManager.FindByEmailAsync(login.Email);
            bool isValidUser = await _userManager.CheckPasswordAsync(_user, login.Password);

            if (_user == null || isValidUser == false)
                return null;

            var token = await GenerateToken();

            return new AuthResponse
            {
                Token = token,
                UserId = _user.Id,
                //RefreshToken = await CreateRefreshToken()
            };
        }

        private async Task<string> GenerateToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var roles = await _userManager.GetRolesAsync(_user);
            var roleClaims = roles.Select(_ => new Claim(ClaimTypes.Role, _)).ToList();
            var userClaims = await _userManager.GetClaimsAsync(_user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, _user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, _user.Email),
                new Claim("uid", _user.Id),
                new Claim("role", roles.FirstOrDefault())// ?? "User"
            }
            .Union(userClaims)
            .Union(roleClaims);

            var token = new JwtSecurityToken(
                    issuer: _configuration["JwtSettings:Issuer"],
                    audience: _configuration["JwtSettings:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["JwtSettings:DurationInMinutes"])),
                    signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //public async Task<string> CreateRefreshToken()
        //{
        //    //try
        //    //{
        //    //    _user = await _userManager.FindByEmailAsync(_user.Email);
        //    //    var res = await _userManager.RemoveAuthenticationTokenAsync(_user, _loginProvider, _refreshToken);

        //    //    var newRefreshToken = await _userManager.GenerateUserTokenAsync(_user, _loginProvider, _refreshToken);

        //    //    var result = await _userManager.SetAuthenticationTokenAsync(_user, _loginProvider, _refreshToken, newRefreshToken);

        //    //    if (!result.Succeeded)
        //    //        return null;

        //    //    return newRefreshToken;
        //    //}
        //    //catch (Exception)
        //    //{

        //    //    throw;
        //    //}
        //    await _userManager.RemoveAuthenticationTokenAsync(_user, _loginProvider, _refreshToken);
        //    var newRefreshToken = await _userManager.GenerateUserTokenAsync(_user, _loginProvider, _refreshToken);
        //    var result = await _userManager.SetAuthenticationTokenAsync(_user, _loginProvider, _refreshToken, newRefreshToken);
        //    return newRefreshToken;

        //}

        public async Task<AuthResponse> VerifyRefreshToken(AuthResponse request)
        {
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var tokenContent = jwtSecurityTokenHandler.ReadJwtToken(request.Token);
            var userName = tokenContent.Claims.ToList().FirstOrDefault(_ => _.Type == ClaimTypes.Email)?.Value;

            _user = await _userManager.FindByNameAsync(userName);

            if (_user == null || _user.Id != request.UserId)
                return null;

            var isValidRefreshToken = await _userManager.VerifyUserTokenAsync(_user, _loginProvider, _refreshToken, request.RefreshToken);

            if (isValidRefreshToken)
            {
                var token = await GenerateToken();
                return new AuthResponse
                {
                    Token = token,
                    UserId = _user.Id,
                    //RefreshToken = await CreateRefreshToken()
                };
            }

            await _userManager.UpdateSecurityStampAsync(_user);
            return null;
        }
    }
}