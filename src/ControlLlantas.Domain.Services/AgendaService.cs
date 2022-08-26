using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain.Services.Interfaces;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace And.ControlLlantas.Domain.Services
{
    public class AgendaService : IAgendaService
    {
        protected readonly IAgendaRepository _agendaRepository;

        public AgendaService(IAgendaRepository agendaRepository)
        {
            _agendaRepository = agendaRepository;
        }

        public virtual async Task<Agenda> Save(Agenda agenda)
        {
            await _agendaRepository.CreateOrUpdateAsync(agenda);
            await _agendaRepository.SaveChangesAsync();
            return agenda;
        }

        public virtual async Task<IPage<Agenda>> FindAll(IPageable pageable)
        {
            var page = await _agendaRepository.QueryHelper()
                .Include(agenda => agenda.Vehiculo)
                .Include(agenda => agenda.Proveedor)
                .GetPageAsync(pageable);
            return page;
        }

        public virtual async Task<Agenda> FindOne(long id)
        {
            var result = await _agendaRepository.QueryHelper()
                .Include(agenda => agenda.Vehiculo)
                .Include(agenda => agenda.Proveedor)
                .GetOneAsync(agenda => agenda.Id == id);
            return result;
        }

        public virtual async Task Delete(long id)
        {
            await _agendaRepository.DeleteByIdAsync(id);
            await _agendaRepository.SaveChangesAsync();
        }
    }
}
