﻿using Domain.Dtos.Slider;
using Domain.Models;
using Infrastructure.Implementations.Repositories;
using Infrastructure.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlidersController : ControllerBase
    {
        private readonly ISliderRepository _sliderRepository;

        public SlidersController(ISliderRepository sliderRepository)
        {
            this._sliderRepository = sliderRepository;
        }

        [HttpGet("active")]
        public async Task<ActionResult<Slider>> GetSlider()
        {
            var slider = await _sliderRepository.GetActiveSlider();

            if (slider == null)
                return NotFound();

            return slider;
        }

        [HttpGet]
        public async Task<ActionResult<List<Slider>>> GetSliders()
        {
            try
            {
                var sliders = await _sliderRepository.GetAllAsync();

                if (sliders != null)
                    return Ok(sliders);

                return BadRequest();
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex);

                return StatusCode(500, "Internal server error");
            }
        }

        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        //{
        //    return await _productRepository.GetProducts();
        //}

        [HttpGet("{id}")]
        public async Task<ActionResult<Slider>> GetSlider(int id)
        {
            var slider = await _sliderRepository.GetSliderAsync(id);

            if (slider == null)
                return NotFound();

            return slider;
        }

        [HttpPost]
        public async Task<ActionResult> PostSlider([FromBody] SliderCreateRequest request)
        {
            var createdSlider = await _sliderRepository.CreateSliderAsync(request);

            return CreatedAtAction("GetSlider", "Sliders", new { id = createdSlider.SliderId }, createdSlider);
        }

        [HttpPut("{sliderId}")]
        public async Task<IActionResult> UpdateSlider(int sliderId, [FromBody] Slider slider)
        {
            if (sliderId != slider.SliderId)
                return BadRequest();

            var updatedSliderItem = await _sliderRepository.UpdateSliderAsync(slider);

            if (updatedSliderItem == null)
                return NotFound();

            return NoContent();
        }

        [HttpPut("{sliderId}/set-active")]
        public async Task<IActionResult> SetActive(int sliderId)
        {
            var success = await _sliderRepository.SetActive(sliderId);

            if (success)
                return NoContent();

            return NotFound();
        }

        // DELETE: api/Sliders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlider(int id)
        {
            if (await _sliderRepository.RemoveSliderAsync(id))
                return NoContent();

            return BadRequest();
        }
    }
}
