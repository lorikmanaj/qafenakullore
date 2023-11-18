using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<ApiUser> GetUserByIdAsync(string userId);
        Task<ApiUser> GetLoggedInUser();
    }
}
