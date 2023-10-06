using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace QafenAkullAPI.Domain.Entities
{
    public class ApiUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }

        [InverseProperty("User")]
        public List<ProductReview> ProductReviews { get; set; } // One-to-Many relationship
        [InverseProperty("User")]
        public List<Testimonial> Testimonials { get; set; } // One-to-Many relationship
                                                            // Remove the Cart collection
        public Cart Cart { get; set; }
    }
}
