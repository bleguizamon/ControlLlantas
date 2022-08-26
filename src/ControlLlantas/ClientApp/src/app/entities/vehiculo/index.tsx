import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Vehiculo from "./vehiculo";
import VehiculoDetail from "./vehiculo-detail";
import VehiculoUpdate from "./vehiculo-update";
import VehiculoDeleteDialog from "./vehiculo-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={VehiculoUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={VehiculoUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={VehiculoDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={Vehiculo} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={VehiculoDeleteDialog}
    />
  </>
);

export default Routes;
