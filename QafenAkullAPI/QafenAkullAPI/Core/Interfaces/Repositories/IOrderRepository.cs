using QafenAkullAPI.Core.DTO.Order;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        Task<Order> AddOrder(CreateOrderDTO order);
        Task<List<Order>> GetOrders();

    }
}
