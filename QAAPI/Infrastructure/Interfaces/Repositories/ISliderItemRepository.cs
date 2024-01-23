using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces.Repositories
{
    public interface ISliderItemRepository
    {
        Task<SliderItem> GetSliderItemByIdAsync(int sliderItemId);
        Task<List<SliderItem>> GetSliderItemsAsync(int sliderId);
        Task<SliderItem> AddSliderItemAsync(SliderItem sliderItem);
        Task<SliderItem> UpdateSliderItemAsync(SliderItem sliderItem);
        Task<bool> RemoveSliderItemAsync(int sliderItemId);
    }
}
