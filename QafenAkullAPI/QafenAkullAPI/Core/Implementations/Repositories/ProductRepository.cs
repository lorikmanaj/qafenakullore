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
                        Image = prod.MainImage,
                        Background = prod.BackgroundImage
                    };

                    _context.Products.Add(newProduct);
                    await _context.SaveChangesAsync();

                    // Step 2: Retrieve the ProductId
                    var productId = newProduct.ProductId;

                    // Step 3: Insert stock data with the retrieved productId
                    var newStock = new Stock
                    {
                        ProductId = productId,
                        Quantity = prod.Stock
                    };

                    _context.Stocks.Add(newStock);
                    await _context.SaveChangesAsync();

                    // Step 4: Handle gallery images
                    var gallery = new Gallery
                    {
                        ProductId = productId
                    };

                    _context.Galleries.Add(gallery);
                    await _context.SaveChangesAsync();

                    foreach (var galleryImageSource in prod.Gallery)
                    {
                        await _storageManager.HandleImageAsync(galleryImageSource, productId, "Gallery");

                        var itemGallery = new ItemGallery
                        {
                            GalleryId = gallery.GalleryId,
                            ProductId = productId,
                            ImageUrl = galleryImageSource
                        };

                        _context.ItemGalleries.Add(itemGallery);
                    }

                    // Step 5: Handle variety images
                    foreach (var variety in prod.Varieties)
                    {
                        await _storageManager.HandleImageAsync(variety.ImageUrl, productId, "Variety");

                        var varietyEntity = new Variety
                        {
                            ProductId = productId,
                            Description = variety.Description,
                            ImageUrl = variety.ImageUrl
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
                                ProductId = productId,
                                Tag = newTag
                            };
                            _context.ProductTags.Add(productTag);
                        }
                        else
                        {
                            // Tag already exists, create a record in ProductTags
                            var productTag = new ProductTag
                            {
                                ProductId = productId,
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
