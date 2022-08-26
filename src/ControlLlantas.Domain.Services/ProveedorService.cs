using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain.Services.Interfaces;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace And.ControlLlantas.Domain.Services
{
    public class ProveedorService : IProveedorService
    {
        protected readonly IProveedorRepository _proveedorRepository;

        public ProveedorService(IProveedorRepository proveedorRepository)
        {
            _proveedorRepository = proveedorRepository;
        }

        public virtual async Task<Proveedor> Save(Proveedor proveedor)
        {
            await _proveedorRepository.CreateOrUpdateAsync(proveedor);
            await _proveedorRepository.SaveChangesAsync();
            return proveedor;
        }

        public virtual async Task<IPage<Proveedor>> FindAll(IPageable pageable)
        {
            var page = await _proveedorRepository.QueryHelper()
                .Include(proveedor => proveedor.Municipio)
                .Include(proveedor => proveedor.Departamento)
                .GetPageAsync(pageable);
            return page;
        }

        public virtual async Task<Proveedor> FindOne(long id)
        {
            var result = await _proveedorRepository.QueryHelper()
                .Include(proveedor => proveedor.Municipio)
                .Include(proveedor => proveedor.Departamento)
                .GetOneAsync(proveedor => proveedor.Id == id);
            return result;
        }

        public virtual async Task Delete(long id)
        {
            await _proveedorRepository.DeleteByIdAsync(id);
            await _proveedorRepository.SaveChangesAsync();
        }
    }
}
