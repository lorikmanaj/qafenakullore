using Domain.Models;
using Infrastructure.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        [HttpGet("{sliderItemId}")]
        public async Task<ActionResult<SliderItem>> GetSliderItem(int sliderItemId)
        {
            var sliderItem = await _sliderItemsRepository.GetSliderItemByIdAsync(sliderItemId);

            if (sliderItem == null)
                return NotFound();

            return sliderItem;
        }

        [HttpGet("slider/{sliderId}")]
        public async Task<ActionResult<IEnumerable<SliderItem>>> GetSliderItems(int sliderId)
        {
            var sliderItems = await _sliderItemsRepository.GetSliderItemsAsync(sliderId);

            if (sliderItems == null)
                return NotFound();

            return sliderItems;
        }

        [HttpPost]
        public async Task<ActionResult<SliderItem>> CreateSliderItem([FromBody] SliderItem sliderItem)
        {
            var createdSliderItem = await _sliderItemsRepository.AddSliderItemAsync(sliderItem);

            return CreatedAtAction(nameof(GetSliderItem), new { sliderItemId = createdSliderItem.SliderItemId }, createdSliderItem);
        }

        [HttpPut("{sliderItemId}")]
        public async Task<IActionResult> UpdateSliderItem(int sliderItemId, [FromBody] SliderItem sliderItem)
        {
            if (sliderItemId != sliderItem.SliderItemId)
                return BadRequest();

            var updatedSliderItem = await _sliderItemsRepository.UpdateSliderItemAsync(sliderItem);

            if (updatedSliderItem == null)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{sliderItemId}")]
        public async Task<IActionResult> DeleteSliderItem(int sliderItemId)
        {
            if (await _sliderItemsRepository.RemoveSliderItemAsync(sliderItemId))
                return NoContent();

            return BadRequest();
        }
    }
}
