using Application.DTO;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace QafenAkull.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;

        public AuthController(IAuthService authService, IJwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationDTO registrationDto)
        {
            var isRegistered = await _authService.RegisterUserAsync(registrationDto);

            if (!isRegistered)
                return Conflict("User with the provided email already exists.");

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO loginDto)
        {
            var user = await _authService.AuthenticateUserAsync(loginDto.Email, loginDto.Password);

            if (user == null)
                return Unauthorized("Invalid email or password.");

            var token = _jwtService.GenerateToken(user);

            return Ok(new { Token = token });
        }
    }
}
