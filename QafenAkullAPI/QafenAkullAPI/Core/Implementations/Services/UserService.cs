using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Core.Interfaces.Services;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Implementations.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ApiUser> GetUserByIdAsync(string userId)
        {
            return await _userRepository.GetUserByIdAsync(userId);
        }

        public async Task<ApiUser> GetLoggedInUser()
        {
            return await _userRepository.GetLoggedInUser();
        }
    }
}
