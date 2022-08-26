using System.Threading.Tasks;
using And.ControlLlantas.Domain;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IMailService
    {
        Task SendPasswordResetMail(User user);
        Task SendActivationEmail(User user);
        Task SendCreationEmail(User user);
    }
}
