using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QafenAkullAPI.Core.DTO;
using QafenAkullAPI.Core.DTO.ResponseModels;
using QafenAkullAPI.Core.DTO.User;
using QafenAkullAPI.Core.Interfaces.Services;

namespace QafenAkullAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthManager _authManager;

        public AccountController(IAuthManager authManager)
        {
            this._authManager = authManager;
        }

        // POST: api/Account/register
        [HttpPost]
        [Route("register")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Register([FromBody] UserDTO apiUser)
        {
            var errors = await _authManager.Register(apiUser);

            if (errors.Any())
            {
                foreach (var error in errors)
                    ModelState.AddModelError(error.Code, error.Description);

                return BadRequest(ModelState);
            }

            return Ok(apiUser);
        }

        // POST: api/Account/login
        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Login([FromBody] LoginDTO login)
        {
            var authResponse = await _authManager.Login(login);

            if (authResponse == null)
                return Unauthorized();

            return Ok(authResponse);
        }

        // POST: api/Account/refreshtoken
        [HttpPost]
        [Route("refreshtoken")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> RefreshToken([FromBody] AuthResponse request)
        {
            var authResponse = await _authManager.VerifyRefreshToken(request);

            if (authResponse == null)
                return Unauthorized();

            return Ok(authResponse);
        }

        //// POST: api/Account/login
        //[HttpGet]
        //[Route("test")]
        //[Authorize(Roles = "Administrator")] //SAMPLE
        //public async Task<ActionResult> Test()
        //{
        //    return Ok();
        //}

        //[Authorize]
        //[HttpGet("authed")]
        //public async Task<ActionResult> Test2()
        //{
        //    return Ok();
        //}
    }
}
