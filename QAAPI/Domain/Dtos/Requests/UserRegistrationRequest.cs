using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Requests;

public record UserRegistrationRequest
{
    //[Required]
    //public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}