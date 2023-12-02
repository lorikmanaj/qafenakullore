using Api.Interfaces.Repositories;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemGalleriesController : ControllerBase
    {
        private readonly IItemGalleryRepository _itemGalleryRepository;

        public ItemGalleriesController(IItemGalleryRepository itemGalleryRepository)
        {
            this._itemGalleryRepository = itemGalleryRepository;
        }

        // GET: api/ItemGalleries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ItemGallery>>> GetItemGallery(int id)
        {
            var itemGallery = await _itemGalleryRepository.GetProductGallery(id);

            if (itemGallery == null)
                return NotFound();

            return itemGallery;
        }
    }
}
