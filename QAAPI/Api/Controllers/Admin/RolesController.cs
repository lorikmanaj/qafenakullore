using Domain.Dtos.Responses;
using Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.Admin;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = PolicyType.Administrator)]
public class RolesController : ControllerBase
{
    private readonly ILogger<RolesController> _logger;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public RolesController(ILogger<RolesController> logger, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAll()
    {
        var existingRoles = await _roleManager.Roles.ToListAsync();
        return Ok(existingRoles);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Create(string name)
    {
        // check if the role already exists
        var roleExists = await _roleManager.RoleExistsAsync(name);
        if (roleExists)
        {
            return BadRequest(new CreateRoleResponse()
            {
                Success = false,
                Errors = new List<string>() { "Role already exists" }
            });
        }

        var role = new IdentityRole(name);
        var result = await _roleManager.CreateAsync(role);
        if (!result.Succeeded)
        {
            return BadRequest(new CreateRoleResponse()
            {
                Success = false,
                Errors = result.Errors.Select(e => e.Description).ToList()
            });
        }

        _logger.LogInformation($"The role {name} was added with success");
        return Ok(new CreateRoleResponse { Success = true });
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> AddRoleToUser(string email, string role)
    {
        // check if the user exists
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is null)
        {
            _logger.LogInformation($"The user with email {email} does not exist");
            return BadRequest(new { Error = "User does not exist" });
        }

        // check if the role exists
        var roleExists = await _roleManager.RoleExistsAsync(role);
        if (!roleExists)
        {
            return BadRequest(new
            {
                Success = false,
                Errors = new List<string>() { "Role does not exists" }
            });
        }

        // check if the role was assigned correctly
        var result = await _userManager.AddToRoleAsync(existingUser, role);
        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                Success = false,
                Errors = result.Errors.Select(e => e.Description).ToList()
            });
        }

        return Ok(new { Success = true, Message = $"User with email {email} has been added to the role {role}" });
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetUserRoles(string email)
    {
        // check if the email exists
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is null)
        {
            _logger.LogInformation($"The user with email {email} does not exist");
            return BadRequest(new { Error = "User does not exist" });
        }

        // return roles
        var userRoles = await _userManager.GetRolesAsync(existingUser);
        return Ok(userRoles);
    }

    [HttpDelete("[action]")]
    public async Task<IActionResult> DeleteUserFromRole(string email, string role)
    {
        // check if user exists
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is null)
        {
            _logger.LogInformation($"The user with email {email} does not exist");
            return BadRequest(new { Error = "User does not exist" });
        }

        // check role exists
        var roleExists = await _roleManager.RoleExistsAsync(role);
        if (!roleExists)
        {
            return BadRequest(new
            {
                Success = false,
                Errors = new List<string>() { "Role does not exists" }
            });
        }

        var result = await _userManager.RemoveFromRoleAsync(existingUser, role);
        if (!result.Succeeded)
            return BadRequest(new { Errors = result.Errors.Select(e => e.Description).ToList() });

        return Ok(new { Message = $"User with {email} has been removed from role {role}" });
    }
}