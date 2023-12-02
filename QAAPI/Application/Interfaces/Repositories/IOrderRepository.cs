using Domain.Dtos.Order;
using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        Task<Order> AddOrder(CreateOrderDto order);
        Task<List<Order>> GetOrders();
    }
}
