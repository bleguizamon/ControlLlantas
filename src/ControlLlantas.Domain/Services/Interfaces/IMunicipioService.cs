using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IMunicipioService
    {
        Task<Municipio> Save(Municipio municipio);

        Task<IPage<Municipio>> FindAll(IPageable pageable);

        Task<Municipio> FindOne(long id);

        Task Delete(long id);
    }
}
