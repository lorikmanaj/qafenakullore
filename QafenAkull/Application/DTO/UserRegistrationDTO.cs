using System.ComponentModel.DataAnnotations;

namespace Application.DTO
{
    public class UserRegistrationDTO
    {
        //[Required]
        //public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
    }
}
