using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain.Services.Interfaces;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace And.ControlLlantas.Domain.Services
{
    public class ConductorService : IConductorService
    {
        protected readonly IConductorRepository _conductorRepository;

        public ConductorService(IConductorRepository conductorRepository)
        {
            _conductorRepository = conductorRepository;
        }

        public virtual async Task<Conductor> Save(Conductor conductor)
        {
            await _conductorRepository.CreateOrUpdateAsync(conductor);
            await _conductorRepository.SaveChangesAsync();
            return conductor;
        }

        public virtual async Task<IPage<Conductor>> FindAll(IPageable pageable)
        {
            var page = await _conductorRepository.QueryHelper()
                .GetPageAsync(pageable);
            return page;
        }

        public virtual async Task<Conductor> FindOne(long id)
        {
            var result = await _conductorRepository.QueryHelper()
                .GetOneAsync(conductor => conductor.Id == id);
            return result;
        }

        public virtual async Task Delete(long id)
        {
            await _conductorRepository.DeleteByIdAsync(id);
            await _conductorRepository.SaveChangesAsync();
        }
    }
}
