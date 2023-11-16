using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Configurations;

namespace QafenAkullAPI.Infrastructure.Persistence
{
    public class QafenAkullDbContext : IdentityDbContext<ApiUser>
    {
        public QafenAkullDbContext(DbContextOptions options) : base(options)
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

            modelBuilder.Entity<Cart>().ToTable("Carts");
            modelBuilder.Entity<CartItem>().ToTable("CartItems");
            modelBuilder.Entity<Discount>().ToTable("Discounts");
            modelBuilder.Entity<Gallery>().ToTable("Galleries");
            modelBuilder.Entity<ItemGallery>().ToTable("ItemGalleries");
            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<OrderProduct>().ToTable("OrderProducts");
            modelBuilder.Entity<PaymentMethod>().ToTable("PaymentMethods");
            modelBuilder.Entity<Product>().ToTable("Products");
            modelBuilder.Entity<ProductReview>().ToTable("ProductReviews");
            modelBuilder.Entity<ProductType>().ToTable("ProductTypes");
            modelBuilder.Entity<ProfileOption>().ToTable("ProfileOptions");
            modelBuilder.Entity<PromoProduct>().ToTable("PromoProducts");
            modelBuilder.Entity<Slider>().ToTable("Sliders");
            modelBuilder.Entity<SliderItem>().ToTable("SliderItems");
            modelBuilder.Entity<Testimonial>().ToTable("Testimonials");
            modelBuilder.Entity<Variety>().ToTable("Varieties");

            modelBuilder.Entity<ItemGallery>()
                .HasOne(ig => ig.Product)
                .WithMany(p => p.ItemGalleries)
                .HasForeignKey(ig => ig.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Product>()
                .HasMany(r => r.ProductReviews)
                .WithOne(p => p.Product)
                .HasForeignKey(p => p.ProductId);

            modelBuilder.Entity<Cart>()
                .HasMany(c => c.Items)
                .WithOne(ci => ci.Cart)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WishList>()
                .HasMany(wl => wl.WishListItems)
                .WithOne(wli => wli.WishList)
                .OnDelete(DeleteBehavior.Cascade);

            //DataSeed seeder = new DataSeed(this);
            //seeder.Seed();
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<ItemGallery> ItemGalleries { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductTag> ProductTags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ProfileOption> ProfileOptions { get; set; }
        public DbSet<PromoProduct> PromoProducts { get; set; }
        public DbSet<Slider> Sliders { get; set; }
        public DbSet<SliderItem> SliderItems { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<Variety> Varieties { get; set; }
        public DbSet<WishList> WishLists { get; set; }
        public DbSet<WishListItem> WishListItems { get; set; }
    }
}
