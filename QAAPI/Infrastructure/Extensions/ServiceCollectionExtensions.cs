using Api.Implementations.Repositories;
using Api.Implementations.Services;
using Api.Implementations.Token;
using Api.Interfaces.Repositories;
using Api.Interfaces.Services;
using Api.Interfaces.Token;
using Application.Implementations.Repositories;
using Infrastructure.Database;
using Infrastructure.Implementations.Repositories;
using Infrastructure.Implementations.Services;
using Infrastructure.Interfaces.Repositories;
using Infrastructure.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly("Infrastructure"));
            });

            services
                .AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = false)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddAuthManager();
            services.AddUserService();
            services.AddRepositories();
            services.AddStorageManager(configuration);
            services.AddShoppingService();

            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductTypesRepository, ProductTypesRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IItemGalleryRepository, ItemGalleryRepository>();
            services.AddScoped<IProductReviewRepository, ProductReviewRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<ICartItemRepository, CartItemRepository>();
            services.AddScoped<IWishListRepository, WishListRepository>();
            services.AddScoped<IWishListItemRepository, WishListItemRepository>();
            return services;
        }

        public static IServiceCollection AddStorageManager(this IServiceCollection services, IConfiguration configuration)
        {
            var basePath = configuration["StorageSettings:BasePath"];
            services.AddScoped<IStorageManager>(_ => new StorageManager(basePath));

            return services;
        }

        public static IServiceCollection AddUserService(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();

            return services;
        }

        public static IServiceCollection AddShoppingService(this IServiceCollection services)
        {
            services.AddScoped<IShoppingService, ShoppingService>();

            return services;
        }

        public static IServiceCollection AddAuthManager(this IServiceCollection services)
        {
            services.AddScoped<IAuthManager, AuthManager>();
            services.AddScoped<ITokenGenerator, TokenGenerator>();
            services.AddScoped<ITokenValidator, TokenValidator>();

            return services;
        }
    }
}
