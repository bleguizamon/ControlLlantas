using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using And.ControlLlantas.Domain;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using And.ControlLlantas.Infrastructure.Data.Extensions;

namespace And.ControlLlantas.Infrastructure.Data.Repositories
{
    public class VehiculoRepository : GenericRepository<Vehiculo, long>, IVehiculoRepository
    {
        public VehiculoRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<Vehiculo> CreateOrUpdateAsync(Vehiculo vehiculo)
        {
            List<Type> entitiesToBeUpdated = new List<Type>();
            return await base.CreateOrUpdateAsync(vehiculo, entitiesToBeUpdated);
        }
    }
}
