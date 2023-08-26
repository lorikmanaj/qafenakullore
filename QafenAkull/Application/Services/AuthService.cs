using Application.DTO;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System.Text;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        // Other dependencies

        public AuthService(IUserRepository userRepository, IPasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            // Initialize other dependencies
        }

        public async Task<bool> RegisterUserAsync(UserRegistrationDTO registrationDto)
        {
            // Registration logic
            if (await _userRepository.UserExistsByEmail(registrationDto.Email))
                return false;

            var newUser = new User
            {
                UserName = registrationDto.UserName,
                Email = registrationDto.Email,
                FirstName = registrationDto.FirstName,
                LastName = registrationDto.LastName,
                PhoneNumber = registrationDto.PhoneNumber,
                DateOfBirth = registrationDto.DateOfBirth,
                Address = registrationDto.Address
            };

            // Hash the password and store the hash in the database
            var hashedPassword = _passwordHasher.HashPassword(newUser, registrationDto.Password);
            newUser.PasswordHash = Encoding.UTF8.GetBytes(hashedPassword);

            // Add the user to the database
            await _userRepository.CreateUserAsync(newUser);

            return true;
        }

        public async Task<User> AuthenticateUserAsync(string email, string password)
        {
            // Find the user by email
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
                // User not found
                return null;

            // Verify the password
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // Authentication successful
            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                    if (computedHash[i] != passwordHash[i])
                        return false;
            }
            return true;
        }
        // Additional methods as needed
    }

}
