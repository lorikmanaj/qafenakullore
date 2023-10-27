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

        public async Task HandleImageAsync2(string imageSource, int productId, string subdirectory)
        {
            byte[] imageBytes;

            if (imageSource.StartsWith("data:image/"))
            {
                string base64Data = imageSource.Split(',')[1]; // Remove the data URI prefix
                imageBytes = ConvertBase64StringToBytes(base64Data);
            }
            else if (Uri.TryCreate(imageSource, UriKind.Absolute, out Uri uri) && uri.Scheme == "blob")
            {
                imageBytes = await ConvertBlobUriToBytes(imageSource);
            }
            else
            {
                imageBytes = await GetImageBytesFromImageSource(imageSource);
            }

            string fileExtension = GetFileExtensionFromImageSource(imageSource);
            string fileName = $"{Guid.NewGuid()}{fileExtension}";
            string filePath = await GetProductImagePathAsync(productId, subdirectory, fileName);
            await SaveFileAsync(filePath, imageBytes);
        }

        public async Task HandleImageAsync1(string imageSource, int productId, string subdirectory)
        {
            
            // Check if the imageSource uses the "blob" scheme
            if (Uri.TryCreate(imageSource, UriKind.Absolute, out Uri uri) && uri.Scheme == "blob")
            {
                // Handle blob data differently, depending on your requirements
                // You might need to extract the data from the blob URI or use it in some way
                // For example, if it's an in-memory image, you can convert it to bytes and save it.
                byte[] imageBytes = await ConvertBlobUriToBytes(imageSource);

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

        //public byte[] ConvertBlobUriToBytes(string blobUri)
        //{
        //    // Implement the logic to convert data from the blob URI to a byte array
        //    // For example, if the blob contains base64-encoded image data, you can decode it
        //    if (blobUri.StartsWith("blob:"))
        //    {
        //        string base64Data = blobUri.Substring(blobUri.IndexOf(',') + 1); // Remove the data URI prefix
        //        return Convert.FromBase64String(base64Data);
        //    }

        //    return new byte[0];
        //}

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
    }
}