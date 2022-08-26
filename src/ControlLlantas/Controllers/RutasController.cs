
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
    [Route("api/rutas")]
    [ApiController]
    public class RutasController : ControllerBase
    {
        private const string EntityName = "ruta";
        private readonly ILogger<RutasController> _log;
        private readonly IRutaRepository _rutaRepository;

        public RutasController(ILogger<RutasController> log,
        IRutaRepository rutaRepository)
        {
            _log = log;
            _rutaRepository = rutaRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Ruta>> CreateRuta([FromBody] Ruta ruta)
        {
            _log.LogDebug($"REST request to save Ruta : {ruta}");
            if (ruta.Id != 0)
                throw new BadRequestAlertException("A new ruta cannot already have an ID", EntityName, "idexists");

            await _rutaRepository.CreateOrUpdateAsync(ruta);
            await _rutaRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRuta), new { id = ruta.Id }, ruta)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, ruta.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateRuta(long id, [FromBody] Ruta ruta)
        {
            _log.LogDebug($"REST request to update Ruta : {ruta}");
            if (ruta.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != ruta.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _rutaRepository.CreateOrUpdateAsync(ruta);
            await _rutaRepository.SaveChangesAsync();
            return Ok(ruta)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, ruta.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ruta>>> GetAllRutas(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Rutas");
            var result = await _rutaRepository.QueryHelper()
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRuta([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Ruta : {id}");
            var result = await _rutaRepository.QueryHelper()
                .GetOneAsync(ruta => ruta.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRuta([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Ruta : {id}");
            await _rutaRepository.DeleteByIdAsync(id);
            await _rutaRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
