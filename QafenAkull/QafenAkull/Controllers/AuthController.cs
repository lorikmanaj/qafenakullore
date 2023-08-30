using Application.DTO;
using Application.Interfaces.Services;
using Domain.Models.ResponseModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using QafenAkull.Configurations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QafenAkull.Controllers
{
    [ApiController]
    [Route("api/Auth")]
    public class AuthController : ControllerBase
    {
        //private readonly ILogger<AuthController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        private readonly JwtConfig _jwtConfig;

        public AuthController(//ILogger<AuthController> logger,
            IAuthService authService,
            IJwtService jwtService,
            UserManager<IdentityUser> userManager,
            IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            _authService = authService;
            _jwtService = jwtService;
            _userManager = userManager;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegistrationDTO registrationDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var emailExist = await _userManager.FindByEmailAsync(registrationDto.Email);

                    if (emailExist != null)
                        return BadRequest("Email already exists!");

                    var newUser = new IdentityUser()
                    {
                        Email = registrationDto.Email,
                        UserName = registrationDto.Email
                    };

                    var isCreated = await _userManager.CreateAsync(newUser, registrationDto.Password);

                    if (isCreated.Succeeded)
                    {
                        var token = GenerateJwtToken(newUser);

                        return Ok(new RegistrationResponse()
                        {
                            Result = true,
                            Token = token
                        });
                    }

                    //return BadRequest(isCreated.Errors.Select(x => x.Description).ToList());
                    //var isRegistered = await _authService.RegisterUserAsync(registrationDto);

                    //if (!isRegistered)
                    //    return Conflict("User with the provided email already exists.");

                    //return Ok("User registered successfully.");
                }

                return BadRequest("Invalid request payload.");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.InnerException);
                throw;
            }

        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(4),//.AddMinutes(5) -> use this when done
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                        SecurityAlgorithms.HmacSha512)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDTO loginDto)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(loginDto.Email);

                if (existingUser == null)
                    return BadRequest("Invalid authentication.");

                var isPasswordValid = await _userManager.CheckPasswordAsync(existingUser, loginDto.Password);

                if (isPasswordValid) 
                {
                    var token = GenerateJwtToken(existingUser);
                    return Ok(new LoginResponse() 
                    {
                        Token = token,
                        Result = true
                    });
                }
            }

            return BadRequest("Invalid request payload.");
            //    var user = await _authService.AuthenticateUserAsync(loginDto.Email, loginDto.Password);

            //    if (user == null)
            //        return Unauthorized("Invalid email or password.");

            //    var token = _jwtService.GenerateToken(user);

            //    return Ok(new { Token = token });
        }
    }
}
