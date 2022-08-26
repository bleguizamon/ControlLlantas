
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
    [Route("api/proveedors")]
    [ApiController]
    public class ProveedorsController : ControllerBase
    {
        private const string EntityName = "proveedor";
        private readonly ILogger<ProveedorsController> _log;
        private readonly IProveedorRepository _proveedorRepository;

        public ProveedorsController(ILogger<ProveedorsController> log,
        IProveedorRepository proveedorRepository)
        {
            _log = log;
            _proveedorRepository = proveedorRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Proveedor>> CreateProveedor([FromBody] Proveedor proveedor)
        {
            _log.LogDebug($"REST request to save Proveedor : {proveedor}");
            if (proveedor.Id != 0)
                throw new BadRequestAlertException("A new proveedor cannot already have an ID", EntityName, "idexists");

            await _proveedorRepository.CreateOrUpdateAsync(proveedor);
            await _proveedorRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProveedor), new { id = proveedor.Id }, proveedor)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, proveedor.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateProveedor(long id, [FromBody] Proveedor proveedor)
        {
            _log.LogDebug($"REST request to update Proveedor : {proveedor}");
            if (proveedor.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != proveedor.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _proveedorRepository.CreateOrUpdateAsync(proveedor);
            await _proveedorRepository.SaveChangesAsync();
            return Ok(proveedor)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, proveedor.Id.ToString()));
        }

        [HttpGet("cities/{name}")]
        public async Task<IActionResult> GetProveedorByCiudad([FromRoute] string name)
        {
            _log.LogDebug($"REST request to get Proveedor : {name}");
            var result = await _proveedorRepository.QueryHelper()
                 .Include(proveedor => proveedor.Municipio)
                 .Include(proveedor => proveedor.Departamento)
                 .GetOneAsync(proveedor => (proveedor.Municipio.Nombre == name || proveedor.Departamento.Nombre == name));
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proveedor>>> GetAllProveedors(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Proveedors");
            var result = await _proveedorRepository.QueryHelper()
                .Include(proveedor => proveedor.Municipio)
                .Include(proveedor => proveedor.Departamento)
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProveedor([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Proveedor : {id}");
            var result = await _proveedorRepository.QueryHelper()
                .Include(proveedor => proveedor.Municipio)
                .Include(proveedor => proveedor.Departamento)
                .GetOneAsync(proveedor => proveedor.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProveedor([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Proveedor : {id}");
            await _proveedorRepository.DeleteByIdAsync(id);
            await _proveedorRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
