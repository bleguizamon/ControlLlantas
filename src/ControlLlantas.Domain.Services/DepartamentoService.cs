using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain.Services.Interfaces;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace And.ControlLlantas.Domain.Services
{
    public class DepartamentoService : IDepartamentoService
    {
        protected readonly IDepartamentoRepository _departamentoRepository;

        public DepartamentoService(IDepartamentoRepository departamentoRepository)
        {
            _departamentoRepository = departamentoRepository;
        }

        public virtual async Task<Departamento> Save(Departamento departamento)
        {
            await _departamentoRepository.CreateOrUpdateAsync(departamento);
            await _departamentoRepository.SaveChangesAsync();
            return departamento;
        }

        public virtual async Task<IPage<Departamento>> FindAll(IPageable pageable)
        {
            var page = await _departamentoRepository.QueryHelper()
                .GetPageAsync(pageable);
            return page;
        }

        public virtual async Task<Departamento> FindOne(long id)
        {
            var result = await _departamentoRepository.QueryHelper()
                .GetOneAsync(departamento => departamento.Id == id);
            return result;
        }

        public virtual async Task Delete(long id)
        {
            await _departamentoRepository.DeleteByIdAsync(id);
            await _departamentoRepository.SaveChangesAsync();
        }
    }
}
