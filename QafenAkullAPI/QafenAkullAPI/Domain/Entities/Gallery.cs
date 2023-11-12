using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class Gallery
    {
        [Key]
        public int GalleryId { get; set; }

        [ForeignKey("ProductId")]
        public int ProductId { get; set; }

        public Product Product { get; set; }
    }
}
