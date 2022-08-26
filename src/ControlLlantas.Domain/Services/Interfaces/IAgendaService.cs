using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IAgendaService
    {
        Task<Agenda> Save(Agenda agenda);

        Task<IPage<Agenda>> FindAll(IPageable pageable);

        Task<Agenda> FindOne(long id);

        Task Delete(long id);
    }
}
