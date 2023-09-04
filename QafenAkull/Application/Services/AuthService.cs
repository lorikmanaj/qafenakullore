using Application.DTO;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Models.ResponseModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        // Other dependencies

        public AuthService(IUserRepository userRepository,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _configuration = configuration;
            // Initialize other dependencies
        }

        private async Task<string> GenerateToken(IdentityUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x)).ToList();

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
                    issuer: _configuration["JwtConfig:Issuer"],
                    audience: _configuration["JwtConfig:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["JwtConfig:DurationInMinutes"])),
                    signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Task<User> AuthenticateUserAsync(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<AuthResult> Login(UserLoginDTO loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            bool isValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (user == null || isValid == false)
                return null;
            
            var token = await GenerateToken(user);

            return new AuthResult
            {
                Token = token,
                UserId = user.Id
            };
        }

        public async Task<bool> RegisterUserAsync(UserRegistrationDTO registrationDto)
        {
            var userExists = await _userManager.FindByEmailAsync(registrationDto.Email);

            if (userExists != null)
                return false;
            
            var newUser = new IdentityUser()
            {
                Email = registrationDto.Email,
                UserName = registrationDto.Email
            };

            var isCreated = await _userManager.CreateAsync(newUser, registrationDto.Password);

            if (isCreated.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "User");
                //var token = GenerateJwtToken(newUser);

                //return Ok(new RegistrationResponse()
                //{
                //    Result = true,
                //    Token = token
                //});
                return true;
            }

            return false;
            // Registration logic
            //if (await _userRepository.UserExistsByEmail(registrationDto.Email))
            //    return false;

            //var newUser = new User
            //{
            //    //UserName = registrationDto.UserName,
            //    Email = registrationDto.Email,
            //    FirstName = registrationDto.FirstName,
            //    LastName = registrationDto.LastName,
            //    PhoneNumber = registrationDto.PhoneNumber,
            //    //DateOfBirth = registrationDto.DateOfBirth,
            //    Address = registrationDto.Address
            //};

            //// Hash the password and store the hash & salt in the database
            //var salt = GenerateSalt();

            ////var hashedPassword = _passwordHasher.HashPassword(newUser, registrationDto.Password);
            ////newUser.PasswordHash = Encoding.UTF8.GetBytes(hashedPassword);
            //newUser.PasswordSalt = salt;
            //newUser.PasswordHash = Encoding.UTF8.GetBytes(_passwordHasher.HashPassword(newUser, registrationDto.Password));

            //// Add the user to the database
            //await _userRepository.CreateUserAsync(newUser);

            //return true;
        }

    }

}
