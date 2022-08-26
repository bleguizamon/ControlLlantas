
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
    [Route("api/departamentos")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private const string EntityName = "departamento";
        private readonly ILogger<DepartamentosController> _log;
        private readonly IDepartamentoRepository _departamentoRepository;

        public DepartamentosController(ILogger<DepartamentosController> log,
        IDepartamentoRepository departamentoRepository)
        {
            _log = log;
            _departamentoRepository = departamentoRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Departamento>> CreateDepartamento([FromBody] Departamento departamento)
        {
            _log.LogDebug($"REST request to save Departamento : {departamento}");
            if (departamento.Id != 0)
                throw new BadRequestAlertException("A new departamento cannot already have an ID", EntityName, "idexists");

            await _departamentoRepository.CreateOrUpdateAsync(departamento);
            await _departamentoRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDepartamento), new { id = departamento.Id }, departamento)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, departamento.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateDepartamento(long id, [FromBody] Departamento departamento)
        {
            _log.LogDebug($"REST request to update Departamento : {departamento}");
            if (departamento.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != departamento.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _departamentoRepository.CreateOrUpdateAsync(departamento);
            await _departamentoRepository.SaveChangesAsync();
            return Ok(departamento)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, departamento.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Departamento>>> GetAllDepartamentos(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Departamentos");
            var result = await _departamentoRepository.QueryHelper()
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartamento([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Departamento : {id}");
            var result = await _departamentoRepository.QueryHelper()
                .GetOneAsync(departamento => departamento.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartamento([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Departamento : {id}");
            await _departamentoRepository.DeleteByIdAsync(id);
            await _departamentoRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
