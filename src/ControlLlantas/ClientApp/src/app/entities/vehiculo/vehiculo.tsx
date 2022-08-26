import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IVehiculo } from "app/shared/model/vehiculo.model";
import { getEntities } from "./vehiculo.reducer";

export const Vehiculo = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const vehiculoList = useAppSelector((state) => state.vehiculo.entities);
  const loading = useAppSelector((state) => state.vehiculo.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="vehiculo-heading" data-cy="VehiculoHeading">
        Vehiculos
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
            to="/vehiculo/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Vehiculo
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehiculoList && vehiculoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Num Placa</th>
                <th>Num Pasajeros</th>
                <th>Motor</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Num Ejes</th>
                <th>Kilometraje</th>
                <th>Conductor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehiculoList.map((vehiculo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/vehiculo/${vehiculo.id}`}
                      color="link"
                      size="sm"
                    >
                      {vehiculo.id}
                    </Button>
                  </td>
                  <td>{vehiculo.numPlaca}</td>
                  <td>{vehiculo.numPasajeros}</td>
                  <td>{vehiculo.motor}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.marca}</td>
                  <td>{vehiculo.numEjes}</td>
                  <td>{vehiculo.kilometraje}</td>
                  <td>
                    {vehiculo.conductor ? (
                      <Link to={`/conductor/${vehiculo.conductor.id}`}>
                        {vehiculo.conductor.nombre}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/vehiculo/${vehiculo.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{" "}
                        <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/vehiculo/${vehiculo.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{" "}
                        <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/vehiculo/${vehiculo.id}/delete`}
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
            <div className="alert alert-warning">No Vehiculos found</div>
          )
        )}
      </div>
    </div>
  );
};

export default Vehiculo;
