using Application.DTO;
using Domain.Entities;
using Domain.Models.ResponseModels;

namespace Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUserAsync(UserRegistrationDTO registrationDto);
        //Task<User> AuthenticateUserAsync(string email, string password);
        Task<AuthResult> Login(UserLoginDTO loginDto);
    }
}
