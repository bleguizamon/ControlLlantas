using System.Security.Principal;
using System.Threading.Tasks;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<IPrincipal> Authenticate(string username, string password);
    }
}
