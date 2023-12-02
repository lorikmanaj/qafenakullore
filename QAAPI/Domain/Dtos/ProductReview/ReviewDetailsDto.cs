namespace Domain.Dtos.ProductReview
{
    public class ReviewDetailsDTO
    {
        public int ProductId { get; set; }

        public int TotalReviews { get; set; }
        public int AverageRating { get; set; }
    }
}
