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

        private void SeedProducts()
        {
            var products = new List<Product>();

            for (int i = 1; i <= 10; i++)
            {
                var product = new Product
                {
                    Name = $"Prod {i}",
                    Description = "Sample Description",
                    Price = (decimal)new Random().Next(500, 6000) / 100, // Generates a random price between 5 and 60 euros
                    Image = $"QafenAkullAPI/Assets/Images/Products/{i}/main-img/",
                    Background = $"QafenAkullAPI/Assets/Images/Products/{i}/background/",
                    StockId = i // Set StockId to match ProductId for simplicity
                };

                products.Add(product);
            }

            Products.AddRange(products);
            SaveChanges();
        }

        private void SeedStocks()
        {
            var stocks = new List<Stock>();

            for (int i = 1; i <= 10; i++)
            {
                var stock = new Stock
                {
                    ProductId = i, // Match ProductId for the corresponding product
                    Quantity = new Random().Next(1, 11) // Generates a random quantity between 1 and 10
                };

                stocks.Add(stock);
            }

            Stocks.AddRange(stocks);
            SaveChanges();
        }

        private void SeedGalleries()
        {
            var galleries = new List<Gallery>();

            for (int i = 4; i <= 10; i++)
            {
                var gallery = new Gallery
                {
                    ProductId = i // Generates a random quantity between 1 and 10
                };

                galleries.Add(gallery);
            }

            Galleries.AddRange(galleries);
            SaveChanges();
        }

        private void SeedItemGalleries()
        {
            var itemGalleries = new List<ItemGallery>();
            var random = new Random();

            var products = Products.ToList();

            foreach (var product in products)
            {
                var numGalleries = random.Next(2, 6); // Randomly choose between 2 and 5 galleries for each product

                for (int i = 0; i < numGalleries; i++)
                {
                    var itemGallery = new ItemGallery
                    {
                        ProductId = product.ProductId,
                        ImageUrl = "FIX"//GetImageUrl(product.ProductId)
                        // You can set the ImageUrl as per your requirements here
                    };

                    itemGalleries.Add(itemGallery);
                }
            }

            ItemGalleries.AddRange(itemGalleries);
            SaveChanges();
        }

        public void SeedData()
        {
            //SeedItemGalleries();
            //SeedGalleries();
            //if (!Products.Any())
            //{
            //    // Seed products and stocks here
            //    SeedProducts();
            //    SeedStocks();
            //}
            //QafenAkullAPI\Assets\Images\Products\10\Gallery\test.png
            //QafenAkullAPI/Assets/Images/Products/10/background/
            //QafenAkullAPI\Assets\Images\Products\3\Varieties\test.png
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
            modelBuilder.Entity<Stock>().ToTable("Stocks");
            modelBuilder.Entity<Testimonial>().ToTable("Testimonials");
            modelBuilder.Entity<Variety>().ToTable("Varieties");

            modelBuilder.Entity<ItemGallery>()
                .HasOne(ig => ig.Product)
                .WithMany(p => p.ItemGalleries)
                .HasForeignKey(ig => ig.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

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
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<Variety> Varieties { get; set; }
        public DbSet<WishList> WishLists { get; set; }
        public DbSet<WishListItem> WishListItems { get; set; }
    }
}
