using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.User
{
    public class UserDTO
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}
