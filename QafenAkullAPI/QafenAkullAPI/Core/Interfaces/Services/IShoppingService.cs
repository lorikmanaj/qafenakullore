namespace QafenAkullAPI.Core.Interfaces.Services
{
    public interface IShoppingService
    {
        Task CreateCartForUser(string userId);
        Task CreateWishlistForUser(string userId);
    }
}
