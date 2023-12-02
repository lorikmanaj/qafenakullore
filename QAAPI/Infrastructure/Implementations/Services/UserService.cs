using Api.Interfaces.Repositories;
using Infrastructure.Interfaces.Services;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Implementations.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IdentityUser> GetUserByIdAsync(string userId)
        {
            return await _userRepository.GetUserByIdAsync(userId);
        }

        public async Task<IdentityUser> GetLoggedInUser()
        {
            return await _userRepository.GetLoggedInUser();
        }
    }
}
