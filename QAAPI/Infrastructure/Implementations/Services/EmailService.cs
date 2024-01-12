using Infrastructure.Interfaces.Services;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Implementations.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string senderEmail, string senderName, 
            string receiverEmail, string receiverName,
            string subject, string message)
        {
            //var apiKey = _configuration["BrevoApi:ApiKey"];

            //var apiInstance = new TransactionalEmailsApi();
            var apiKey = _configuration["BrevoApi:ApiKey"];

            var apiInstance = new TransactionalEmailsApi();

            SendSmtpEmailSender sender = new SendSmtpEmailSender(senderName, senderEmail);

            SendSmtpEmailTo receiver = new SendSmtpEmailTo(receiverEmail, receiverName);
            List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();

            To.Add(receiver);

            string HtmlContent = "";
            string TextContent = message;

            try
            {
                var sendSmtpEmail = new SendSmtpEmail(sender, To, null, null,
                    HtmlContent, TextContent,
                    subject);

                CreateSmtpEmail result = apiInstance.SendTransacEmail(sendSmtpEmail);
                Console.WriteLine("Brevo Response: " + result.ToJson());
            }
            catch (Exception e)
            {
                Console.WriteLine("We have an exception: " + e.Message);
                throw;
            }
        }
    }
}
