using Domain.Models;
using Infrastructure.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database;

public class ApplicationDbContext : IdentityDbContext
{
    //public virtual DbSet<Product> Products { get; set; }
    //public virtual DbSet<Company> Companies { get; set; }
    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderStatus> OrderStatuses { get; set; }
    public virtual DbSet<OrderProduct> OrderProducts { get; set; }
    public virtual DbSet<Cart> Carts { get; set; }
    public virtual DbSet<CartItem> CartItems { get; set; }
    public virtual DbSet<Discount> Discounts { get; set; }
    public virtual DbSet<Gallery> Galleries { get; set; }
    public virtual DbSet<ItemGallery> ItemGalleries { get; set; }
    public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
    public virtual DbSet<ProductReview> ProductReviews { get; set; }
    public virtual DbSet<ProductType> ProductTypes { get; set; }
    public virtual DbSet<TypeSize> TypeSizes { get; set; }
    public virtual DbSet<ProductMaterial> ProductMaterials { get; set; }
    public virtual DbSet<ProductTag> ProductTags { get; set; }
    public virtual DbSet<Tag> Tags { get; set; }
    public virtual DbSet<ProfileOption> ProfileOptions { get; set; }
    public virtual DbSet<PromoProduct> PromoProducts { get; set; }
    public virtual DbSet<Slider> Sliders { get; set; }
    public virtual DbSet<SliderItem> SliderItems { get; set; }
    public virtual DbSet<Testimonial> Testimonials { get; set; }
    public virtual DbSet<Variety> Varieties { get; set; }
    public virtual DbSet<WishList> WishLists { get; set; }
    public virtual DbSet<WishListItem> WishListItems { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //builder.ApplyConfiguration(new UserConfiguration());
        //builder.ApplyConfiguration(new RoleConfiguration());
        //builder.ApplyConfiguration(new UserRolesConfiguration());
        //builder.ApplyConfiguration(new ProductConfiguration());
        builder.ApplyConfiguration(new RefreshTokenConfiguration());
        //builder.ApplyConfiguration(new CompanyConfiguration());

        builder.Entity<IdentityUser>().ToTable("Users");
        builder.Entity<IdentityRole>().ToTable("Roles");
        builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles").HasKey(p => new { p.UserId, p.RoleId });
        builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
        builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins").HasKey(p => p.UserId);
        builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens").HasKey(p => p.UserId);

        builder.Entity<Cart>().ToTable("Carts");
        builder.Entity<CartItem>().ToTable("CartItems");
        builder.Entity<Discount>().ToTable("Discounts");
        builder.Entity<Gallery>().ToTable("Galleries");
        builder.Entity<ItemGallery>().ToTable("ItemGalleries");
        builder.Entity<Order>().ToTable("Orders");
        builder.Entity<OrderProduct>().ToTable("OrderProducts");
        builder.Entity<PaymentMethod>().ToTable("PaymentMethods");
        builder.Entity<Product>().ToTable("Products");
        builder.Entity<ProductReview>().ToTable("ProductReviews");
        builder.Entity<ProductType>().ToTable("ProductTypes");
        builder.Entity<ProductMaterial>().ToTable("ProductMaterials");
        builder.Entity<TypeSize>().ToTable("TypeSizes");
        builder.Entity<ProfileOption>().ToTable("ProfileOptions");
        builder.Entity<PromoProduct>().ToTable("PromoProducts");
        builder.Entity<Slider>().ToTable("Sliders");
        builder.Entity<SliderItem>().ToTable("SliderItems");
        builder.Entity<Testimonial>().ToTable("Testimonials");
        builder.Entity<Variety>().ToTable("Varieties");

        builder.Entity<ItemGallery>()
            .HasOne(ig => ig.Product)
            .WithMany(p => p.ItemGalleries)
            .HasForeignKey(ig => ig.ProductId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Product>()
            .HasMany(r => r.ProductReviews)
            .WithOne(p => p.Product)
            .HasForeignKey(p => p.ProductId);

        builder.Entity<Cart>()
            .HasMany(c => c.Items)
            .WithOne(ci => ci.Cart)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<WishList>()
            .HasMany(wl => wl.WishListItems)
            .WithOne(wli => wli.WishList)
            .OnDelete(DeleteBehavior.Cascade);
    }
}