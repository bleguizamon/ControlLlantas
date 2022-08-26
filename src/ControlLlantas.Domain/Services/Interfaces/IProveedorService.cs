using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IProveedorService
    {
        Task<Proveedor> Save(Proveedor proveedor);

        Task<IPage<Proveedor>> FindAll(IPageable pageable);

        Task<Proveedor> FindOne(long id);

        Task Delete(long id);
    }
}
