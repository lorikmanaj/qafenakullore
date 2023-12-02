using System.ComponentModel.DataAnnotations;

namespace Domain.Dtos.Requests;

public class NewTokenRequest
{
    [Required]
    public string Token { get; set; }

    [Required]
    public string RefreshToken { get; set; }
}