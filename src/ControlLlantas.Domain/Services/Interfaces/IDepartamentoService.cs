using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain;

namespace And.ControlLlantas.Domain.Services.Interfaces
{
    public interface IDepartamentoService
    {
        Task<Departamento> Save(Departamento departamento);

        Task<IPage<Departamento>> FindAll(IPageable pageable);

        Task<Departamento> FindOne(long id);

        Task Delete(long id);
    }
}
