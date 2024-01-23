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
    public class SliderItemRepository : ISliderItemRepository
    {
        private readonly ApplicationDbContext _context;

        public SliderItemRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<SliderItem> GetSliderItemByIdAsync(int sliderItemId)
        {
            var sliderItem = await _context.SliderItems.FindAsync(sliderItemId);

            if (sliderItem == null)
                return null;

            return sliderItem;
        }

        public async Task<List<SliderItem>> GetSliderItemsAsync(int sliderId)
        {
            var sliderItems = await _context.SliderItems.Where(_ => _.SliderId == sliderId).ToListAsync();

            if (sliderItems == null)
                return null;

            return sliderItems;
        }

        public async Task<SliderItem> AddSliderItemAsync(SliderItem sliderItem)
        {
            _context.SliderItems.Add(sliderItem);
            await _context.SaveChangesAsync();

            return sliderItem;
        }

        public async Task<SliderItem> UpdateSliderItemAsync(SliderItem sliderItem)
        {
            _context.Entry(sliderItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null; // Handle concurrency exception
            }

            return sliderItem;
        }

        public async Task<bool> RemoveSliderItemAsync(int sliderItemId)
        {
            var existingSliderItem = await _context.SliderItems
                .FirstOrDefaultAsync(si => si.SliderItemId == sliderItemId);

            if (existingSliderItem != null)
            {
                _context.SliderItems.Remove(existingSliderItem);
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }
    }
}
