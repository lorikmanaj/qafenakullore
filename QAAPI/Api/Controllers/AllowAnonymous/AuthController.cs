using Domain.Dtos.Requests;
using Domain.Dtos.Responses;
using Infrastructure.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.AllowAnonymous;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthManager _authManager;

    public AuthController(IAuthManager authManager)
    {
        this._authManager = authManager;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Register(UserRegistrationRequest request)
    {
        var result = await _authManager.Register(request);
        return GetActionResult(result);
    }
    //Test comment
    [HttpPost("[action]")]
    public async Task<IActionResult> Login(UserLoginRequest request)
    {
        var result = await _authManager.Login(request);
        return GetActionResult(result);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> UpdateToken(NewTokenRequest request)
    {
        var result = await _authManager.UpdateToken(request);
        return GetActionResult(result);
    }

    private IActionResult GetActionResult(AuthResult result)
    {
        if (!result.Success)
        {
            return BadRequest(new
            {
                Errors = result.Errors,
                Success = false
            });
        }

        return Ok(new
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            Success = true
        });
    }
}