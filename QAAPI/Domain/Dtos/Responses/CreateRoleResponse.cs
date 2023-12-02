namespace Domain.Dtos.Responses;

public class CreateRoleResponse
{
    public bool Success { get; set; }
    public List<string> Errors { get; set; }
}