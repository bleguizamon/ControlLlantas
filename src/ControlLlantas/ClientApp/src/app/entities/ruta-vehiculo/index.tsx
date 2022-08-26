import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import RutaVehiculo from "./ruta-vehiculo";
import RutaVehiculoDetail from "./ruta-vehiculo-detail";
import RutaVehiculoUpdate from "./ruta-vehiculo-update";
import RutaVehiculoDeleteDialog from "./ruta-vehiculo-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={RutaVehiculoUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={RutaVehiculoUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={RutaVehiculoDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={RutaVehiculo} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={RutaVehiculoDeleteDialog}
    />
  </>
);

export default Routes;
