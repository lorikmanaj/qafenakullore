using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces.Services
{
    public interface IEmailService
    {
        void SendEmail(string senderEmail, string senderName,
                    string receiverEmail, string receiverName,
                    string subject, string message);
    }
}
