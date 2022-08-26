
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
    [Route("api/municipios")]
    [ApiController]
    public class MunicipiosController : ControllerBase
    {
        private const string EntityName = "municipio";
        private readonly ILogger<MunicipiosController> _log;
        private readonly IMunicipioRepository _municipioRepository;

        public MunicipiosController(ILogger<MunicipiosController> log,
        IMunicipioRepository municipioRepository)
        {
            _log = log;
            _municipioRepository = municipioRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Municipio>> CreateMunicipio([FromBody] Municipio municipio)
        {
            _log.LogDebug($"REST request to save Municipio : {municipio}");
            if (municipio.Id != 0)
                throw new BadRequestAlertException("A new municipio cannot already have an ID", EntityName, "idexists");

            await _municipioRepository.CreateOrUpdateAsync(municipio);
            await _municipioRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMunicipio), new { id = municipio.Id }, municipio)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, municipio.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateMunicipio(long id, [FromBody] Municipio municipio)
        {
            _log.LogDebug($"REST request to update Municipio : {municipio}");
            if (municipio.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != municipio.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _municipioRepository.CreateOrUpdateAsync(municipio);
            await _municipioRepository.SaveChangesAsync();
            return Ok(municipio)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, municipio.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Municipio>>> GetAllMunicipios(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Municipios");
            var result = await _municipioRepository.QueryHelper()
                .Include(municipio => municipio.Departamento)
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMunicipio([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Municipio : {id}");
            var result = await _municipioRepository.QueryHelper()
                .Include(municipio => municipio.Departamento)
                .GetOneAsync(municipio => municipio.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMunicipio([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Municipio : {id}");
            await _municipioRepository.DeleteByIdAsync(id);
            await _municipioRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
