using QafenAkullAPI.Core.Interfaces.Services;
using System.Net;

namespace QafenAkullAPI.Core.Implementations.Services
{
    public class StorageManager : IStorageManager
    {
        private readonly string baseStoragePath;

        public StorageManager(string baseStoragePath)
        {
            this.baseStoragePath = baseStoragePath;
        }

        public async Task<string> GetProductImagePathAsync(int productId, string subdirectory, string fileName)
        {
            string productPath = Path.Combine(baseStoragePath, "Images", "Products", productId.ToString(), subdirectory);
            Directory.CreateDirectory(productPath); 
            return Path.Combine(productPath, fileName);
        }

        public async Task SaveFileAsync(string filePath, byte[] fileBytes)
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await stream.WriteAsync(fileBytes, 0, fileBytes.Length);
            }
        }

        public async Task<bool> FileExistsAsync(string filePath)
        {
            return File.Exists(filePath);
        }

        public string GetFileExtensionFromImageSource(string imageSource)
        {
            return Path.GetExtension(imageSource);
        }

        public async Task HandleImageAsync(string imageSource, int productId, string subdirectory)
        {
            // Check if the imageSource uses the "blob" scheme
            if (Uri.TryCreate(imageSource, UriKind.Absolute, out Uri uri) && uri.Scheme == "blob")
            {
                // Handle blob data differently, depending on your requirements
                // You might need to extract the data from the blob URI or use it in some way
                // For example, if it's an in-memory image, you can convert it to bytes and save it.
                byte[] imageBytes = ConvertBlobUriToBytes(imageSource);

                // Continue with saving the imageBytes to the desired location
                string fileExtension = GetFileExtensionFromImageSource(imageSource);
                string fileName = $"{Guid.NewGuid()}{fileExtension}";
                string filePath = await GetProductImagePathAsync(productId, subdirectory, fileName);
                await SaveFileAsync(filePath, imageBytes);
            }
            else
            {
                // Handle other types of image sources (e.g., HTTP URLs) here
                byte[] imageBytes = await GetImageBytesFromImageSource(imageSource);
                string fileExtension = GetFileExtensionFromImageSource(imageSource);
                string fileName = $"{Guid.NewGuid()}{fileExtension}";
                string filePath = await GetProductImagePathAsync(productId, subdirectory, fileName);
                await SaveFileAsync(filePath, imageBytes);
            }
        }

        public byte[] ConvertBlobUriToBytes(string blobUri)
        {
            // Implement the logic to convert data from the blob URI to a byte array
            // For example, if the blob contains base64-encoded image data, you can decode it
            if (blobUri.StartsWith("blob:"))
            {
                string base64Data = blobUri.Substring(blobUri.IndexOf(',') + 1); // Remove the data URI prefix
                return Convert.FromBase64String(base64Data);
            }

            return new byte[0];
        }

        private async Task<byte[]> GetImageBytesFromImageSource(string imageSource)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    byte[] imageBytes = await httpClient.GetByteArrayAsync(imageSource);
                    return imageBytes;
                }
                catch (HttpRequestException ex)
                {
                    throw new Exception("Error downloading image.", ex);
                }
            }
        }
    }
}