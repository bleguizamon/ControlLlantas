import React from "react";
import { Switch } from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Vehiculo from "./vehiculo";
import Conductor from "./conductor";
import Proveedor from "./proveedor";
import Municipio from "./municipio";
import Departamento from "./departamento";
import Agenda from "./agenda";
import Ruta from "./ruta";
import RutaVehiculo from "./ruta-vehiculo";
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}vehiculo`} component={Vehiculo} />
        <ErrorBoundaryRoute
          path={`${match.url}conductor`}
          component={Conductor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}proveedor`}
          component={Proveedor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}municipio`}
          component={Municipio}
        />
        <ErrorBoundaryRoute
          path={`${match.url}departamento`}
          component={Departamento}
        />
        <ErrorBoundaryRoute path={`${match.url}agenda`} component={Agenda} />
        <ErrorBoundaryRoute
          path={`${match.url}conductor`}
          component={Conductor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}proveedor`}
          component={Proveedor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}municipio`}
          component={Municipio}
        />
        <ErrorBoundaryRoute
          path={`${match.url}departamento`}
          component={Departamento}
        />
        <ErrorBoundaryRoute path={`${match.url}ruta`} component={Ruta} />
        <ErrorBoundaryRoute
          path={`${match.url}conductor`}
          component={Conductor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}proveedor`}
          component={Proveedor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}municipio`}
          component={Municipio}
        />
        <ErrorBoundaryRoute
          path={`${match.url}departamento`}
          component={Departamento}
        />
        <ErrorBoundaryRoute
          path={`${match.url}ruta-vehiculo`}
          component={RutaVehiculo}
        />
        <ErrorBoundaryRoute
          path={`${match.url}conductor`}
          component={Conductor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}proveedor`}
          component={Proveedor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}municipio`}
          component={Municipio}
        />
        <ErrorBoundaryRoute
          path={`${match.url}departamento`}
          component={Departamento}
        />
        <ErrorBoundaryRoute
          path={`${match.url}ruta-vehiculo`}
          component={RutaVehiculo}
        />
        <ErrorBoundaryRoute
          path={`${match.url}conductor`}
          component={Conductor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}proveedor`}
          component={Proveedor}
        />
        <ErrorBoundaryRoute
          path={`${match.url}municipio`}
          component={Municipio}
        />
        <ErrorBoundaryRoute
          path={`${match.url}departamento`}
          component={Departamento}
        />
        <ErrorBoundaryRoute
          path={`${match.url}ruta-vehiculo`}
          component={RutaVehiculo}
        />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
