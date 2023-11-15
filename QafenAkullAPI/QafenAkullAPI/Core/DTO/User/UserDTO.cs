using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Core.DTO.User
{
    public class UserDTO : LoginDTO
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}
