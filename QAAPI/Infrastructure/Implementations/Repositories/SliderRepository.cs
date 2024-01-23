using Domain.Dtos.Slider;
using Domain.Models;
using Infrastructure.Database;
using Infrastructure.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Implementations.Repositories
{
    public class SliderRepository : ISliderRepository
    {
        private readonly ApplicationDbContext _context;

        public SliderRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<Slider> GetActiveSlider()
        {
            var slider = await _context.Sliders.Where(_ => _.IsActive == true).Include(si => si.SliderItems).ThenInclude(p => p.Product).FirstOrDefaultAsync();

            if (slider == null)
                return null;

            return slider;
        }

        public async Task<List<Slider>> GetAllAsync()
        {
            var sliders = await _context.Sliders.ToListAsync();

            foreach (var slider in sliders)
            {
                var sliderItems = await _context.SliderItems
                    .Include(si => si.Product) // Include Product in the query
                    .Where(si => si.SliderId == slider.SliderId)
                    .ToListAsync();

                slider.SliderItems = sliderItems;
            }

            return sliders;
        }

        //NOT USED
        public async Task<List<Slider>> GetAll()
        {
            var sliders = await _context.Sliders.ToListAsync();

            foreach (var slider in sliders)
            {
                var sliderItems = await _context.SliderItems.Where(si => si.SliderId == slider.SliderId).ToListAsync();

                foreach (var sliderItem in sliderItems)
                {
                    sliderItem.Product = await _context.Products.FindAsync(sliderItem.ProductId);
                }

                slider.SliderItems = sliderItems;
            }

            return sliders;
        }

        public async Task<Slider> GetSliderAsync(int sliderId)
        {
            return await _context.Sliders.FirstOrDefaultAsync(s => s.SliderId == sliderId);
        }

        //public async Task<Slider> CreateSliderAsync(string title)
        //{
        //    var slider = new Slider { Title = title };

        //    _context.Sliders.Add(slider);

        //    await _context.SaveChangesAsync();

        //    return slider;
        //}

        public async Task<Slider> CreateSliderAsync(SliderCreateRequest sliderCreateRequest)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var newSlider = new Slider { Title = sliderCreateRequest.Title };

                    _context.Sliders.Add(newSlider);
                    await _context.SaveChangesAsync();

                    foreach (int prodId in sliderCreateRequest.ProductIds)
                    {
                        var newSliderItem = new SliderItem
                        {
                            ProductId = prodId,
                            SliderId = newSlider.SliderId
                        };

                        _context.SliderItems.Add(newSliderItem);
                    }

                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return newSlider;
                } catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Error adding the slider.", ex);
                }
            }
        }

        public async Task<Slider> UpdateSliderAsync(Slider slider)
        {
            _context.Entry(slider).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null; // Handle concurrency exception
            }

            return slider;
        }

        public async Task<bool> SetActive(int sliderId)
        {
            var slider = await _context.Sliders.FindAsync(sliderId);

            if (slider == null)
                return false;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Deactivate all sliders
                    //var allSliders = await _context.Sliders.ToListAsync();
                    //foreach (var s in allSliders)
                    //{
                    //    s.IsActive = false;
                    //}
                    var activeSlider = await _context.Sliders.FirstOrDefaultAsync(_ => _.IsActive == true);
                    activeSlider.IsActive = false;

                    // Activate the selected slider
                    slider.IsActive = true;

                    await _context.SaveChangesAsync();
                    transaction.Commit();

                    return true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Error setting slider as active.", ex);
                }
            }
        }

        public async Task<bool> RemoveSliderAsync(int sliderId)
        {
            var slider = await _context.Sliders.FirstOrDefaultAsync(s => s.SliderId == sliderId);

            if (slider != null)
            {
                _context.Sliders.Remove(slider);
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }
    }
}
