
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
    [Route("api/ruta-vehiculos")]
    [ApiController]
    public class RutaVehiculosController : ControllerBase
    {
        private const string EntityName = "rutaVehiculo";
        private readonly ILogger<RutaVehiculosController> _log;
        private readonly IRutaVehiculoRepository _rutaVehiculoRepository;
        private readonly IVehiculoRepository _vehiculoRepository;

        public RutaVehiculosController(ILogger<RutaVehiculosController> log,
        IRutaVehiculoRepository rutaVehiculoRepository, IVehiculoRepository vehiculoRepository)
        {
            _log = log;
            _rutaVehiculoRepository = rutaVehiculoRepository;
            _vehiculoRepository = vehiculoRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<RutaVehiculo>> CreateRutaVehiculo([FromBody] RutaVehiculo rutaVehiculo)
        {
            _log.LogDebug($"REST request to save RutaVehiculo : {rutaVehiculo}");
            if (rutaVehiculo.Id != 0)
                throw new BadRequestAlertException("A new rutaVehiculo cannot already have an ID", EntityName, "idexists");

            await _rutaVehiculoRepository.CreateOrUpdateAsync(rutaVehiculo);
            await _rutaVehiculoRepository.SaveChangesAsync();
          
              var result = await _vehiculoRepository.QueryHelper()
             .Include(conductor => conductor.Conductor)
             .GetOneAsync(vehiculo => vehiculo.Id == rutaVehiculo.Vehiculo.Id);
            result.Kilometraje += rutaVehiculo.Ruta.Kilometraje;
            await _vehiculoRepository.CreateOrUpdateAsync(result);
            await _vehiculoRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRutaVehiculo), new { id = rutaVehiculo.Id }, rutaVehiculo)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, rutaVehiculo.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateRutaVehiculo(long id, [FromBody] RutaVehiculo rutaVehiculo)
        {
            _log.LogDebug($"REST request to update RutaVehiculo : {rutaVehiculo}");
            if (rutaVehiculo.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != rutaVehiculo.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _rutaVehiculoRepository.CreateOrUpdateAsync(rutaVehiculo);
            await _rutaVehiculoRepository.SaveChangesAsync();
            return Ok(rutaVehiculo)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, rutaVehiculo.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RutaVehiculo>>> GetAllRutaVehiculos(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of RutaVehiculos");
            var result = await _rutaVehiculoRepository.QueryHelper()
                .Include(rutaVehiculo => rutaVehiculo.Vehiculo)
                .Include(rutaVehiculo => rutaVehiculo.Ruta)
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRutaVehiculo([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get RutaVehiculo : {id}");
            var result = await _rutaVehiculoRepository.QueryHelper()
                .Include(rutaVehiculo => rutaVehiculo.Vehiculo)
                .Include(rutaVehiculo => rutaVehiculo.Ruta)
                .GetOneAsync(rutaVehiculo => rutaVehiculo.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRutaVehiculo([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete RutaVehiculo : {id}");
            await _rutaVehiculoRepository.DeleteByIdAsync(id);
            await _rutaVehiculoRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
