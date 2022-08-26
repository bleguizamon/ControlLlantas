using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IVehiculoService
    {
        Task<Vehiculo> Save(Vehiculo vehiculo);

        Task<IPage<Vehiculo>> FindAll(IPageable pageable);

        Task<Vehiculo> FindOne(long id);

        Task Delete(long id);
    }
}
