using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Configurations;

namespace QafenAkullAPI.Infrastructure.Persistence
{
    public class QafenAkullDbContext : IdentityDbContext<ApiUser>
    {
        public QafenAkullDbContext(DbContextOptions options): base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            //modelBuilder.Entity<OrderProduct>()
            //    .HasKey(op => new { op.OPId, op.OrderId, op.ProductId });

            //modelBuilder.Entity<OrderProduct>()
            //    .HasOne(op => op.Order)
            //    .WithMany(o => o.Products)
            //    .HasForeignKey(op => op.OrderId);

            //modelBuilder.Entity<OrderProduct>()
            //    .HasOne(op => op.Product)
            //    .WithMany(p => p.Orders)
            //    .HasForeignKey(op => op.ProductId);
            modelBuilder.Entity<ApiUser>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles").HasKey(p => new { p.UserId, p.RoleId });
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins").HasKey(p => p.UserId);
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens").HasKey(p => p.UserId);
        }


        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
    }
}
