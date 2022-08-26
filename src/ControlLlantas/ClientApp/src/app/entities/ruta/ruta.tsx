import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IRuta } from "app/shared/model/ruta.model";
import { getEntities } from "./ruta.reducer";

export const Ruta = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const rutaList = useAppSelector((state) => state.ruta.entities);
  const loading = useAppSelector((state) => state.ruta.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="ruta-heading" data-cy="RutaHeading">
        Rutas
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
            to="/ruta/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Ruta
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {rutaList && rutaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Ruta</th>
                <th>Ciudad Inicio</th>
                <th>Ciudad Fin</th>
                <th>Kilometraje</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rutaList.map((ruta, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/ruta/${ruta.id}`}
                      color="link"
                      size="sm"
                    >
                      {ruta.id}
                    </Button>
                  </td>
                  <td>{ruta.nombreRuta}</td>
                  <td>{ruta.ciudadInicio}</td>
                  <td>{ruta.ciudadFin}</td>
                  <td>{ruta.kilometraje}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/ruta/${ruta.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{" "}
                        <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ruta/${ruta.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{" "}
                        <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ruta/${ruta.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Rutas found</div>
        )}
      </div>
    </div>
  );
};

export default Ruta;
