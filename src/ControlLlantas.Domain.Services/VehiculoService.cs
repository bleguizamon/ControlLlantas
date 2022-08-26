using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain.Services.Interfaces;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace And.ControlLlantas.Domain.Services
{
    public class VehiculoService : IVehiculoService
    {
        protected readonly IVehiculoRepository _vehiculoRepository;

        public VehiculoService(IVehiculoRepository vehiculoRepository)
        {
            _vehiculoRepository = vehiculoRepository;
        }

        public virtual async Task<Vehiculo> Save(Vehiculo vehiculo)
        {
            await _vehiculoRepository.CreateOrUpdateAsync(vehiculo);
            await _vehiculoRepository.SaveChangesAsync();
            return vehiculo;
        }

        public virtual async Task<IPage<Vehiculo>> FindAll(IPageable pageable)
        {
            var page = await _vehiculoRepository.QueryHelper()
                .Include(vehiculo => vehiculo.Conductor)
                .GetPageAsync(pageable);
            return page;
        }

        public virtual async Task<Vehiculo> FindOne(long id)
        {
            var result = await _vehiculoRepository.QueryHelper()
                .Include(vehiculo => vehiculo.Conductor)
                .GetOneAsync(vehiculo => vehiculo.Id == id);
            return result;
        }

        public virtual async Task Delete(long id)
        {
            await _vehiculoRepository.DeleteByIdAsync(id);
            await _vehiculoRepository.SaveChangesAsync();
        }
    }
}
