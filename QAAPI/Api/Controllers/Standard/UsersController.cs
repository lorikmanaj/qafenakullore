using Domain.Models;
using Infrastructure.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<ApiUser>> GetUserById(string userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [Authorize(Roles = "Administrator")]
        [Authorize(Roles = "User")]
        [HttpGet("Current")]
        public async Task<ActionResult<ApiUser>> GetCurrentUser()
        {
            var user = await _userService.GetLoggedInUser();

            if (user == null)
                return Unauthorized();

            return Ok(user);
        }
    }
}
