using Domain.Dtos.Slider;
using Domain.Models;

namespace Infrastructure.Interfaces.Repositories
{
    public interface ISliderRepository
    {
        //Task<Slider> CreateSliderAsync(string title);
        Task<Slider> GetActiveSlider();
        Task<List<Slider>> GetAll();
        Task<List<Slider>> GetAllAsync();
        Task<Slider> GetSliderAsync(int sliderId);
        Task<Slider> CreateSliderAsync(SliderCreateRequest sliderCreateRequest);
        Task<Slider> UpdateSliderAsync(Slider slider);
        Task<bool> SetActive(int sliderId);
        Task<bool> RemoveSliderAsync(int sliderId);
    }
}
