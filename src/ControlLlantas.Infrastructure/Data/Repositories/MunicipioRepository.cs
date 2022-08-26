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
    public class MunicipioRepository : GenericRepository<Municipio, long>, IMunicipioRepository
    {
        public MunicipioRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<Municipio> CreateOrUpdateAsync(Municipio municipio)
        {
            List<Type> entitiesToBeUpdated = new List<Type>();
            return await base.CreateOrUpdateAsync(municipio, entitiesToBeUpdated);
        }
    }
}
