using Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers.Admin;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = PolicyType.Administrator)]
public class ClaimsController : ControllerBase
{
    private readonly ILogger<RolesController> _logger;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ClaimsController(ILogger<RolesController> logger, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAll()
    {
        return Ok();
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> GetUserClaims(string email)
    {
        // check if the user exists
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is null)
        {
            _logger.LogInformation($"The user with email {email} does not exist");
            return BadRequest(new { Error = "User does not exist" });
        }

        var userClaims = await _userManager.GetClaimsAsync(existingUser);
        return Ok(userClaims);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> AddClaimToUser(string email, string claimName, string claimValue)
    {
        // check if the user exists
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is null)
        {
            _logger.LogInformation($"The user with email {email} does not exist");
            return BadRequest(new { Error = "User does not exist" });
        }

        // create claim first
        var claim = new Claim(claimName, claimValue);

        var result = await _userManager.AddClaimAsync(existingUser, claim);
        if (!result.Succeeded)
        {
            _logger.LogError("Errors while adding a claim to a user");
            return BadRequest(new { Error = result.Errors.Select(e => e.Description).ToList() });
        }

        return Ok(new { Message = $"User {email} has a claim [{claimName}:{claimValue}]" });
    }
}