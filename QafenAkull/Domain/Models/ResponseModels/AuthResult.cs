namespace Domain.Models.ResponseModels
{
    public class AuthResult
    {
        public string UserId { get; set; }
        public string Token { get; set; } = string.Empty;
        public bool Result { get; set; }
        public List<string> Errors { get; set; }
        public string RefreshToken { get; set; }
    }
}
