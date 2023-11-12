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

        public void Seed()
        {
            SeedProducts();
            SeedStocks();
            // Add more seed methods for other entities
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
