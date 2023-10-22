using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class Tag
    {
        [Key]
        public int TagId { get; set; }
        public string Title { get; set; }

        public List<ProductTag> ProductTags { get; set; }
    }
}
