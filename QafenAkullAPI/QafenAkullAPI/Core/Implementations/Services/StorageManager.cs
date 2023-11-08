using QafenAkullAPI.Core.Interfaces.Services;
using System.Net;
using System.Text;

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
            string[] parts = imageSource.Split(',');
            if (parts.Length > 1)
            {
                // The format is typically "data:image/{format};base64,..."
                string mimeTypePart = parts[0];
                int start = mimeTypePart.IndexOf("image/") + 6;
                int end = mimeTypePart.IndexOf(";");
                if (start >= 0 && end >= 0)
                {
                    string format = mimeTypePart.Substring(start, end - start);
                    if (!string.IsNullOrWhiteSpace(format))
                    {
                        return "." + format;
                    }
                }
            }
            return ".jpg"; // Default to .jpg if the format cannot be determined
        }

        public async Task<string> HandleImageAsync(string imageBase64, int productId, string subdirectory)
        {
            byte[] imageBytes = ConvertBase64StringToBytes(imageBase64.Split(',')[1]);

            string fileExtension = GetFileExtensionFromImageSource(imageBase64);

            string fileName = $"{Guid.NewGuid()}{fileExtension}";

            string filePath = await GetProductImagePathAsync(productId, subdirectory, fileName);

            await SaveFileAsync(filePath, imageBytes);

            return filePath;
        }

        public async Task<byte[]> ConvertBlobUriToBytes(string blobUri)
        {
            if (blobUri.StartsWith("blob:"))
            {
                using (HttpClient client = new HttpClient())
                {
                    byte[] content = await client.GetByteArrayAsync(blobUri);

                    return content;
                }
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

        byte[] IStorageManager.ConvertBlobUriToBytes(string blobUri)
        {
            throw new NotImplementedException();
        }

        public byte[] ConvertBase64StringToBytes(string base64String)
        {
            return Convert.FromBase64String(base64String);
        }

        public byte[] GenerateBlobFromImage(string imageBase64, string imagePath)
        {
            if (!string.IsNullOrEmpty(imageBase64))
            {
                // Handle base64-encoded image
                return ConvertBase64StringToBytes(imageBase64.Split(',')[1]);
            }
            else if (!string.IsNullOrEmpty(imagePath))
            {
                // Handle image from file
                // Read the image from the file and convert it to a byte array
                byte[] imageBytes = File.ReadAllBytes(imagePath);
                return imageBytes;
            }
            else
            {
                // Handle the case when no image data is provided (return null or an empty array)
                return new byte[0];
            }
        }

    }
}