using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IConductorService
    {
        Task<Conductor> Save(Conductor conductor);

        Task<IPage<Conductor>> FindAll(IPageable pageable);

        Task<Conductor> FindOne(long id);

        Task Delete(long id);
    }
}
