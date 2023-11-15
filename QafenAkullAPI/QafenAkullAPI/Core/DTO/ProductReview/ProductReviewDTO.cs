using QafenAkullAPI.Core.DTO.User;

namespace QafenAkullAPI.Core.DTO.ProductReview
{
    public class ProductReviewDTO
    {
        public int ProdRevId { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime DateReviewed { get; set; }
        public UserDTO User { get; set; }
    }
}
