using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.DTO.Product
{
    public class CreateProductDTO
    {
        public int TypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string MainImage { get; set; }
        public string BackgroundImage { get; set; }
        public List<string> Gallery { get; set; }
        public int Stock { get; set; }
        public List<string> Tags { get; set; }
        public List<Variety> Varieties { get; set; }
    }
}
