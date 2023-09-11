using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Core.DTO
{
    public class ApiUserDTO : LoginDTO
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}
