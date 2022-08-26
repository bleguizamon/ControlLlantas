
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
    [Route("api/vehiculos")]
    [ApiController]
    public class VehiculosController : ControllerBase
    {
        private const string EntityName = "vehiculo";
        private readonly ILogger<VehiculosController> _log;
        private readonly IVehiculoRepository _vehiculoRepository;

        public VehiculosController(ILogger<VehiculosController> log,
        IVehiculoRepository vehiculoRepository)
        {
            _log = log;
            _vehiculoRepository = vehiculoRepository;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Vehiculo>> CreateVehiculo([FromBody] Vehiculo vehiculo)
        {
            _log.LogDebug($"REST request to save Vehiculo : {vehiculo}");
            if (vehiculo.Id != 0)
                throw new BadRequestAlertException("A new vehiculo cannot already have an ID", EntityName, "idexists");

            await _vehiculoRepository.CreateOrUpdateAsync(vehiculo);
            await _vehiculoRepository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVehiculo), new { id = vehiculo.Id }, vehiculo)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, vehiculo.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateVehiculo(long id, [FromBody] Vehiculo vehiculo)
        {
            _log.LogDebug($"REST request to update Vehiculo : {vehiculo}");
            if (vehiculo.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != vehiculo.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            await _vehiculoRepository.CreateOrUpdateAsync(vehiculo);
            await _vehiculoRepository.SaveChangesAsync();
            return Ok(vehiculo)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, vehiculo.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehiculo>>> GetAllVehiculos(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Vehiculos");
            var result = await _vehiculoRepository.QueryHelper()
                .Include(vehiculo => vehiculo.Conductor)
                .GetPageAsync(pageable);
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehiculo([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Vehiculo : {id}");
            var result = await _vehiculoRepository.QueryHelper()
                .Include(vehiculo => vehiculo.Conductor)
                .GetOneAsync(vehiculo => vehiculo.Id == id);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpGet("placa/{numPlaca}")]
        public async Task<IActionResult> GetVehiculo([FromRoute] string numPlaca)
        {
            _log.LogDebug($"REST request to get Vehiculo : {numPlaca}");
            var result = await _vehiculoRepository.QueryHelper()
                .Include(vehiculo => vehiculo.Conductor)
                .GetOneAsync(vehiculo => vehiculo.NumPlaca == numPlaca);
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehiculo([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Vehiculo : {id}");
            await _vehiculoRepository.DeleteByIdAsync(id);
            await _vehiculoRepository.SaveChangesAsync();
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
