using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain.Services.Interfaces;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace And.ControlLlantas.Domain.Services
{
    public class MunicipioService : IMunicipioService
    {
        protected readonly IMunicipioRepository _municipioRepository;

        public MunicipioService(IMunicipioRepository municipioRepository)
        {
            _municipioRepository = municipioRepository;
        }

        public virtual async Task<Municipio> Save(Municipio municipio)
        {
            await _municipioRepository.CreateOrUpdateAsync(municipio);
            await _municipioRepository.SaveChangesAsync();
            return municipio;
        }

        public virtual async Task<IPage<Municipio>> FindAll(IPageable pageable)
        {
            var page = await _municipioRepository.QueryHelper()
                .Include(municipio => municipio.Departamento)
                .GetPageAsync(pageable);
            return page;
        }

        public virtual async Task<Municipio> FindOne(long id)
        {
            var result = await _municipioRepository.QueryHelper()
                .Include(municipio => municipio.Departamento)
                .GetOneAsync(municipio => municipio.Id == id);
            return result;
        }

        public virtual async Task Delete(long id)
        {
            await _municipioRepository.DeleteByIdAsync(id);
            await _municipioRepository.SaveChangesAsync();
        }
    }
}
