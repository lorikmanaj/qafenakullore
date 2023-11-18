using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<ApiUser> GetUserByIdAsync(string userId);
        Task<ApiUser> GetLoggedInUser();
    }
}
