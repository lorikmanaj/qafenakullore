using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace QafenAkull.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize] // Requires authentication for all actions in this controller
    public class UserController : ControllerBase
    {
        // Constructor, dependencies...

        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            // Retrieve the authenticated user...
            return null;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")] // Requires admin role
        public async Task<IActionResult> GetUserById(int id)
        {
            // Retrieve user by ID...
            return null;
        }
    }
}
