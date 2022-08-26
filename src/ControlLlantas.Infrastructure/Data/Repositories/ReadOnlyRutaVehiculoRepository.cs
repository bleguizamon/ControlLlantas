using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using And.ControlLlantas.Domain;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using And.ControlLlantas.Infrastructure.Data.Extensions;

namespace And.ControlLlantas.Infrastructure.Data.Repositories
{
    public class ReadOnlyRutaVehiculoRepository : ReadOnlyGenericRepository<RutaVehiculo, long>, IReadOnlyRutaVehiculoRepository
    {
        public ReadOnlyRutaVehiculoRepository(IUnitOfWork context) : base(context)
        {
        }
    }
}
