using Application.DTO;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Text;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly UserManager<IdentityUser> _userManager;
        // Other dependencies

        public AuthService(IUserRepository userRepository,
            IPasswordHasher<User> passwordHasher,
            UserManager<IdentityUser> userManager)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _userManager = userManager;
            // Initialize other dependencies
        }

        public async Task<bool> RegisterUserAsync(UserRegistrationDTO registrationDto)
        {
            // Registration logic
            if (await _userRepository.UserExistsByEmail(registrationDto.Email))
                return false;

            var newUser = new User
            {
                //UserName = registrationDto.UserName,
                Email = registrationDto.Email,
                FirstName = registrationDto.FirstName,
                LastName = registrationDto.LastName,
                PhoneNumber = registrationDto.PhoneNumber,
                //DateOfBirth = registrationDto.DateOfBirth,
                Address = registrationDto.Address
            };

            // Hash the password and store the hash & salt in the database
            var salt = GenerateSalt();

            //var hashedPassword = _passwordHasher.HashPassword(newUser, registrationDto.Password);
            //newUser.PasswordHash = Encoding.UTF8.GetBytes(hashedPassword);
            newUser.PasswordSalt = salt;
            newUser.PasswordHash = Encoding.UTF8.GetBytes(_passwordHasher.HashPassword(newUser, registrationDto.Password));

            // Add the user to the database
            await _userRepository.CreateUserAsync(newUser);

            return true;
        }

        public async Task<User> AuthenticateUserAsync(string email, string password)
        {
            // Find the user by email
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
                return null;

            // Verify the password
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // Authentication successful
            return user;
        }

        private byte[] GenerateSalt()
        {
            byte[] saltBytes = new byte[16]; // You can adjust the length as needed
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(saltBytes);
            }
            return saltBytes;
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
