using Domain.Models;
using Infrastructure.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.SuperUser;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = PolicyType.SuperUser)]
public class CompaniesController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public CompaniesController(ApplicationDbContext dbContext) => _dbContext = dbContext;

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAll()
    {
        //var companies = await _dbContext.Companies.ToListAsync();

        return Ok();
    }
}