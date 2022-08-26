import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IRutaVehiculo } from "app/shared/model/ruta-vehiculo.model";
import { getEntities } from "./ruta-vehiculo.reducer";

export const RutaVehiculo = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const rutaVehiculoList = useAppSelector(
    (state) => state.rutaVehiculo.entities
  );
  const loading = useAppSelector((state) => state.rutaVehiculo.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="ruta-vehiculo-heading" data-cy="RutaVehiculoHeading">
        Ruta Vehiculos
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            color="info"
            onClick={handleSyncList}
            disabled={loading}
          >
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link
            to="/ruta-vehiculo/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Ruta Vehiculo
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {rutaVehiculoList && rutaVehiculoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Feha</th>
                <th>Vehiculo</th>
                <th>Ruta</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rutaVehiculoList.map((rutaVehiculo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/ruta-vehiculo/${rutaVehiculo.id}`}
                      color="link"
                      size="sm"
                    >
                      {rutaVehiculo.id}
                    </Button>
                  </td>
                  <td>
                    {rutaVehiculo.feha ? (
                      <TextFormat
                        type="date"
                        value={rutaVehiculo.feha}
                        format={APP_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td>
                    {rutaVehiculo.vehiculo ? (
                      <Link to={`/vehiculo/${rutaVehiculo.vehiculo.id}`}>
                        {rutaVehiculo.vehiculo.numPlaca}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {rutaVehiculo.ruta ? (
                      <Link to={`/ruta/${rutaVehiculo.ruta.id}`}>
                        {rutaVehiculo.ruta.nombreRuta}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/ruta-vehiculo/${rutaVehiculo.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{" "}
                        <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ruta-vehiculo/${rutaVehiculo.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{" "}
                        <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ruta-vehiculo/${rutaVehiculo.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{" "}
                        <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">No Ruta Vehiculos found</div>
          )
        )}
      </div>
    </div>
  );
};

export default RutaVehiculo;
