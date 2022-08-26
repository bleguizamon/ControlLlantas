import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Conductor from "./conductor";
import ConductorDetail from "./conductor-detail";
import ConductorUpdate from "./conductor-update";
import ConductorDeleteDialog from "./conductor-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={ConductorUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={ConductorUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={ConductorDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={Conductor} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={ConductorDeleteDialog}
    />
  </>
);

export default Routes;
