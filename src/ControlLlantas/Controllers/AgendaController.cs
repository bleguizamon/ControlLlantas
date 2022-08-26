
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using And.ControlLlantas.Domain;
using And.ControlLlantas.Crosscutting.Exceptions;
using And.ControlLlantas.Web.Extensions;
using And.ControlLlantas.Web.Filters;
using And.ControlLlantas.Web.Rest.Utilities;
using And.ControlLlantas.Domain.Repositories.Interfaces;
using And.ControlLlantas.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace And.ControlLlantas.Controllers
{
    [Authorize]
    [Route("api/agenda")]
    [ApiController]
    public class AgendaController : ControllerBase
    {
        private const string EntityName = "agenda";
        private readonly ILogger<AgendaController> _log;
        private readonly IAgendaRepository _agendaRepository;

        public AgendaController(ILogger<AgendaController> log,
        IAgendaRepository agendaRepository)
        {
            _log = log;
            _agendaRepository = agendaRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Agenda>> CreateAgenda([FromBody] Agenda agenda)
        {
            _log.LogDebug($"REST request to save Agenda : {agenda}");
            if (agenda.Id != 0)
                throw new BadRequestAlertException("A new agenda cannot already have an ID", EntityName, "idexists");

            await _agendaRepository.CreateOrUpdateAsync(agenda);
            await _agendaRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAgenda), new { id = agenda.Id }, agenda)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, agenda.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateAgenda(long id, [FromBody] Agenda agenda)
        {
            _log.LogDebug($"REST request to update Agenda : {agenda}");
            if (agenda.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != agenda.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _agendaRepository.CreateOrUpdateAsync(agenda);
            await _agendaRepository.SaveChangesAsync();
            return Ok(agenda)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, agenda.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agenda>>> GetAllAgenda(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Agenda");
            var result = await _agendaRepository.QueryHelper()
                .Include(agenda => agenda.Vehiculo)
                .Include(agenda => agenda.Proveedor)
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAgenda([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Agenda : {id}");
            var result = await _agendaRepository.QueryHelper()
                .Include(agenda => agenda.Vehiculo)
                .Include(agenda => agenda.Proveedor)
                .GetOneAsync(agenda => agenda.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgenda([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Agenda : {id}");
            await _agendaRepository.DeleteByIdAsync(id);
            await _agendaRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
