
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
    [Route("api/conductors")]
    [ApiController]
    public class ConductorsController : ControllerBase
    {
        private const string EntityName = "conductor";
        private readonly ILogger<ConductorsController> _log;
        private readonly IConductorRepository _conductorRepository;

        public ConductorsController(ILogger<ConductorsController> log,
        IConductorRepository conductorRepository)
        {
            _log = log;
            _conductorRepository = conductorRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Conductor>> CreateConductor([FromBody] Conductor conductor)
        {
            _log.LogDebug($"REST request to save Conductor : {conductor}");
            if (conductor.Id != 0)
                throw new BadRequestAlertException("A new conductor cannot already have an ID", EntityName, "idexists");

            await _conductorRepository.CreateOrUpdateAsync(conductor);
            await _conductorRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetConductor), new { id = conductor.Id }, conductor)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, conductor.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateConductor(long id, [FromBody] Conductor conductor)
        {
            _log.LogDebug($"REST request to update Conductor : {conductor}");
            if (conductor.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != conductor.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _conductorRepository.CreateOrUpdateAsync(conductor);
            await _conductorRepository.SaveChangesAsync();
            return Ok(conductor)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, conductor.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Conductor>>> GetAllConductors(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Conductors");
            var result = await _conductorRepository.QueryHelper()
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetConductor([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Conductor : {id}");
            var result = await _conductorRepository.QueryHelper()
                .GetOneAsync(conductor => conductor.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConductor([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Conductor : {id}");
            await _conductorRepository.DeleteByIdAsync(id);
            await _conductorRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
