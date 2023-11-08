using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.DTO.Order;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly QafenAkullDbContext _context;

        public OrderRepository(QafenAkullDbContext context)
        {
            this._context = context;
        }

        public Task<Order> AddOrder(CreateOrderDTO order)
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
