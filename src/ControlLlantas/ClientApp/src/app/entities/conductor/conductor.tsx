import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IConductor } from "app/shared/model/conductor.model";
import { getEntities } from "./conductor.reducer";

export const Conductor = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const conductorList = useAppSelector((state) => state.conductor.entities);
  const loading = useAppSelector((state) => state.conductor.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="conductor-heading" data-cy="ConductorHeading">
        Conductors
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
            to="/conductor/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Conductor
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {conductorList && conductorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Num Documento</th>
                <th>Tipo Documento</th>
                <th>Email</th>
                <th>Telefono</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {conductorList.map((conductor, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/conductor/${conductor.id}`}
                      color="link"
                      size="sm"
                    >
                      {conductor.id}
                    </Button>
                  </td>
                  <td>{conductor.nombre}</td>
                  <td>{conductor.apellido}</td>
                  <td>{conductor.numDocumento}</td>
                  <td>{conductor.tipoDocumento}</td>
                  <td>{conductor.email}</td>
                  <td>{conductor.telefono}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/conductor/${conductor.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{" "}
                        <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/conductor/${conductor.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{" "}
                        <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/conductor/${conductor.id}/delete`}
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
            <div className="alert alert-warning">No Conductors found</div>
          )
        )}
      </div>
    </div>
  );
};

export default Conductor;
