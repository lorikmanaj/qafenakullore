using Api.Interfaces.Repositories;
using Domain.Dtos.Order;
using Domain.Models;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Application.Implementations.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public Task<Order> AddOrder(CreateOrderDto order)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Order>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(_ => _.OrderStatus)
                .Include(_ => _.PaymentMethod)
                .Include(_ => _.OrderProducts)
                .Include(_ => _.User)
                .ToListAsync();

            return orders;
        }
    }
}
