import vehiculo from "app/entities/vehiculo/vehiculo.reducer";
import conductor from "app/entities/conductor/conductor.reducer";
import proveedor from "app/entities/proveedor/proveedor.reducer";
import municipio from "app/entities/municipio/municipio.reducer";
import departamento from "app/entities/departamento/departamento.reducer";
import agenda from "app/entities/agenda/agenda.reducer";
import ruta from "app/entities/ruta/ruta.reducer";
import rutaVehiculo from "app/entities/ruta-vehiculo/ruta-vehiculo.reducer";
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  vehiculo,
  conductor,
  proveedor,
  municipio,
  departamento,
  agenda,
  ruta,
  rutaVehiculo,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
