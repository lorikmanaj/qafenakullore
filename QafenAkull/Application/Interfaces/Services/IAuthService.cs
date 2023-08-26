using Application.DTO;
using Domain.Entities;

namespace Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUserAsync(UserRegistrationDTO registrationDto);
        Task<User> AuthenticateUserAsync(string email, string password);
    }
}
