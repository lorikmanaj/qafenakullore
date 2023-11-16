using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Infrastructure.Persistence
{
    public class DataSeed
    {
        private readonly QafenAkullDbContext _context;

        public DataSeed(QafenAkullDbContext context)
        {
            _context = context;
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
                    MainImage = $"QafenAkullAPI/Assets/Images/Products/{i}/main-img/",
                    Background = $"QafenAkullAPI/Assets/Images/Products/{i}/background/",
                    Stock = i // Set StockId to match ProductId for simplicity
                };

                products.Add(product);
            }

            //Products.AddRange(products);
            //SaveChanges();
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

            //Galleries.AddRange(galleries);
            //SaveChanges();
        }

        private void SeedItemGalleries()
        {
            var itemGalleries = new List<ItemGallery>();
            var random = new Random();

            //var products = Products.ToList();

            //foreach (var product in products)
            //{
            //    var numGalleries = random.Next(2, 6); // Randomly choose between 2 and 5 galleries for each product

            //    for (int i = 0; i < numGalleries; i++)
            //    {
            //        var itemGallery = new ItemGallery
            //        {
            //            ProductId = product.ProductId,
            //            ImageUrl = "FIX"//GetImageUrl(product.ProductId)
            //            // You can set the ImageUrl as per your requirements here
            //        };

            //        itemGalleries.Add(itemGallery);
            //    }
            //}

            //ItemGalleries.AddRange(itemGalleries);
            //SaveChanges();
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


        public void Seed()
        {
            //SeedProducts();
            SeedStocks();
            // Add more seed methods for other entities
        }

        private void SeedProducts1()
        {
            var products = new List<Product>();

            for (int i = 1; i <= 10; i++)
            {
                var product = new Product
                {
                    Name = $"Prod {i}",
                    Description = "Sample Description",
                    Price = (decimal)new Random().Next(500, 6000) / 100, // Generates a random price between 5 and 60 euros
                    MainImage = $"QafenAkullAPI/Assets/Images/Products/{i}/main-img/",
                    Background = $"QafenAkullAPI/Assets/Images/Products/{i}/background/",
                    Stock = i // Set StockId to match ProductId for simplicity
                };

                products.Add(product);
            }

            _context.Products.AddRange(products);
            _context.SaveChanges();
        }

        private void SeedStocks()
        {
            return;
        }
        //{
        //    var stocks = new List<Stock>();

        //    for (int i = 1; i <= 10; i++)
        //    {
        //        var stock = new Stock
        //        {
        //            ProductId = i, // Match ProductId for the corresponding product
        //            Quantity = new Random().Next(1, 11) // Generates a random quantity between 1 and 10
        //        };

        //        stocks.Add(stock);
        //    }

        //    _context.Stocks.AddRange(stocks);
        //    _context.SaveChanges();
        //}

        // Add more seed methods for other entities
    }

}
