using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.DTO.Product;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Core.Interfaces.Services;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly QafenAkullDbContext _context;
        private readonly IStorageManager _storageManager;

        public ProductRepository(QafenAkullDbContext context, IStorageManager storageManager)
        {
            this._context = context;
            this._storageManager = storageManager;
        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Type)
                .Include(p => p.Galleries)
                .Include(p => p.Varieties)
                .Include(p => p.ProductReviews)
                .Include(p => p.ItemGalleries)
                .Include(p => p.ProductTags)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            return product;
        }

        public async Task<List<Product>> GetProductsByType(string type)
        {
            int typeId = await _context.ProductTypes
                .Where(_ => _.Type == type)
                .Select(_ => _.TypeId)
                .FirstOrDefaultAsync();

            var prods = await _context.Products
                .Include(_ => _.Type)
                .Include(_ => _.Galleries)
                .Include(_ => _.Varieties)
                .Include(_ => _.ProductReviews)
                .Include(_ => _.ItemGalleries)
                .Include(_ => _.ProductTags)
                .Where(_ => _.TypeId == typeId)
                .ToListAsync();

            return prods;
        }

        public async Task<List<Product>> GetProducts()
        {
            var prods = await _context.Products
                .Include(_ => _.Type)
                .Include(_ => _.Galleries)
                .Include(_ => _.Varieties)
                .Include(_ => _.ProductReviews)
                .Include(_ => _.ItemGalleries)
                .Include(_ => _.ProductTags)
                .ToListAsync();
            return prods;
        }

        public async Task<Product> AddProduct(CreateProductDTO prod)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Step 1: Insert product data (except for StockId)
                    var newProduct = new Product
                    {
                        TypeId = prod.ProductType,
                        Name = prod.Name,
                        Description = prod.Description,
                        Price = prod.Price,
                        Stock = prod.Stock,
                        MainImageBlob = prod.MainImage,
                        BgImageBlob = prod.BackgroundImage
                    };

                    _context.Products.Add(newProduct);
                    await _context.SaveChangesAsync();

                    if (!string.IsNullOrEmpty(prod.MainImage))
                        newProduct.MainImage = await _storageManager.HandleImageAsync(prod.MainImg64, newProduct.ProductId, "MainImage");

                    //Create blob for above file
                    //if (!string.IsNullOrEmpty(newProduct.MainImage))
                        //newProduct.MainImageBlob = await _storageManager.GenerateBlobFromImage(newProduct.MainImage);

                    if (!string.IsNullOrEmpty(prod.BackgroundImage))
                        newProduct.Background = await _storageManager.HandleImageAsync(prod.BgImg64, newProduct.ProductId, "BackgroundImage");

                    await _context.SaveChangesAsync();

                    // Step 4: Handle gallery images
                    var gallery = new Gallery
                    {
                        ProductId = newProduct.ProductId
                    };

                    _context.Galleries.Add(gallery);
                    await _context.SaveChangesAsync();

                    for (int i = 0; i < prod.GalleryBase64.Count; i++)
                    {
                        string filePath = await _storageManager.HandleImageAsync(prod.GalleryBase64[i], newProduct.ProductId, "Gallery");

                        var itemGallery = new ItemGallery
                        {
                            GalleryId = gallery.GalleryId,
                            ProductId = newProduct.ProductId,
                            ImageUrl = filePath,
                            ImageBlob = prod.Gallery[i]
                        };

                        _context.ItemGalleries.Add(itemGallery);
                    }

                    //foreach (var galleryImageSource in prod.GalleryBase64)
                    //{
                    //    string filePath = await _storageManager.HandleImageAsync(galleryImageSource, newProduct.ProductId, "Gallery");

                    //    var itemGallery = new ItemGallery
                    //    {
                    //        GalleryId = gallery.GalleryId,
                    //        ProductId = newProduct.ProductId,
                    //        ImageUrl = filePath
                    //    };

                    //    _context.ItemGalleries.Add(itemGallery);
                    //}

                    // Step 5: Handle variety images
                    for (int i = 0; i < prod.Varieties.Count; i++)
                    {
                        var variety = prod.Varieties[i];
                        var varietyBase64 = prod.VarietyBase64[i];

                        string filePath = await _storageManager.HandleImageAsync(varietyBase64, newProduct.ProductId, "Variety");

                        var varietyEntity = new Variety
                        {
                            ProductId = newProduct.ProductId,
                            Description = variety.Description,
                            ImageUrl = filePath,
                            ImageBlob = prod.Varieties[i].ImageUrl,
                            Stock = prod.Varieties[i].Stock
                        };
                        _context.Varieties.Add(varietyEntity);
                    }

                    // Step 6: Handle product tags
                    foreach (var tag in prod.Tags)
                    {
                        var existingTag = await _context.Tags.FirstOrDefaultAsync(t => t.Title == tag.Title);

                        if (existingTag == null)
                        {
                            // Tag doesn't exist, create a new one
                            var newTag = new Tag { Title = tag.Title };
                            _context.Tags.Add(newTag);

                            // Create a record in ProductTags
                            var productTag = new ProductTag
                            {
                                ProductId = newProduct.ProductId,
                                Tag = newTag
                            };
                            _context.ProductTags.Add(productTag);
                        }
                        else
                        {
                            // Tag already exists, create a record in ProductTags
                            var productTag = new ProductTag
                            {
                                ProductId = newProduct.ProductId,
                                TagId = existingTag.TagId
                            };
                            _context.ProductTags.Add(productTag);
                        }
                    }

                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return newProduct;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    // Handle and log exceptions
                    throw new Exception("Error adding the product.", ex);
                }
            }
        }
    }
}
