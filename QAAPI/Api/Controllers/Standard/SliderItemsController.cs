using Domain.Models;
using Infrastructure.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class SliderItemsController : ControllerBase
    {
        private readonly ISliderItemRepository _sliderItemsRepository;

        public SliderItemsController(ISliderItemRepository sliderItemRepository)
        {
            this._sliderItemsRepository = sliderItemRepository;
        }

        [HttpGet("{sliderItemid}")]
        public async Task<ActionResult<SliderItem>> GetSliderItem(int sliderItemid)
        {
            var sliderItem = await _sliderItemsRepository.GetSliderItemByIdAsync(sliderItemid);

            if (sliderItem == null)
                return NotFound();
            
            return sliderItem;
        }

        [HttpGet("{sliderId}")]
        public async Task<ActionResult<IEnumerable<SliderItem>>> GetSliderItems(int sliderId)
        {
            var sliderItems = await _sliderItemsRepository.GetSliderItemsAsync(sliderId);

            if (sliderItems == null) 
                return NotFound();

            return sliderItems;
        }

        // DELETE: api/SliderItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSliderItem(int id)
        {
            if (await _sliderItemsRepository.RemoveSliderItemAsync(id))
                return NoContent();

            return BadRequest();
        }
    }
}
