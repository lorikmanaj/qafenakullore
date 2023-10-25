namespace QafenAkullAPI.Core.Interfaces.Services
{
    public interface IStorageManager
    {
        Task<string> GetProductImagePathAsync(int productId, string subdirectory, string fileName);
        Task SaveFileAsync(string filePath, byte[] fileBytes);
        Task<bool> FileExistsAsync(string filePath);
        string GetFileExtensionFromImageSource(string imageSource);
        Task HandleImageAsync(string imageSource, int productId, string subdirectory);
        byte[] ConvertBlobUriToBytes(string blobUri);
    }
}
