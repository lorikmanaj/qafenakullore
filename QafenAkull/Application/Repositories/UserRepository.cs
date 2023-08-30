using Application.Interfaces.Generic;
using Application.Interfaces.Repositories;
using Application.Repositories.Generic;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly QADb _context;
        private readonly IGenericRepository<User> _userRepository;

        public UserRepository(QADb context, IGenericRepository<User> userRepository) : base(context)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public async Task CreateUserAsync(User user)
        {
            await _userRepository.AddAsync(user);
        }

        public async Task DeleteUserAsync(User user)
        {
            await _userRepository.DeleteAsync(user.Id);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var usr = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            //return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            //return usr;
            return null;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return null;
            //return await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateAsync(user);
        }

        public async Task<bool> UserExistsByEmail(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }
    }
}
