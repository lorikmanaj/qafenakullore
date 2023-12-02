using Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.SuperUser;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = PolicyType.SuperUser)]
public class SuperUser : ControllerBase
{
    [HttpGet("[action]")]
    public Task<IActionResult> GetAll()
    {
        var result = Ok(Guid.NewGuid().ToString());
        return Task.FromResult<IActionResult>(result);
    }
}