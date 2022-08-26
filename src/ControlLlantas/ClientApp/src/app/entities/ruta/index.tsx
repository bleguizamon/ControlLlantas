import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Ruta from "./ruta";
import RutaDetail from "./ruta-detail";
import RutaUpdate from "./ruta-update";
import RutaDeleteDialog from "./ruta-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={RutaUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={RutaUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={RutaDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={Ruta} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={RutaDeleteDialog}
    />
  </>
);

export default Routes;
