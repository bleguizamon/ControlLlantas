import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Proveedor from "./proveedor";
import ProveedorDetail from "./proveedor-detail";
import ProveedorUpdate from "./proveedor-update";
import ProveedorDeleteDialog from "./proveedor-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={ProveedorUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={ProveedorUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={ProveedorDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={Proveedor} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={ProveedorDeleteDialog}
    />
  </>
);

export default Routes;
