import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IAgenda } from "app/shared/model/agenda.model";
import { getEntities } from "./agenda.reducer";

export const Agenda = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const agendaList = useAppSelector((state) => state.agenda.entities);
  const loading = useAppSelector((state) => state.agenda.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="agenda-heading" data-cy="AgendaHeading">
        Agenda
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
            to="/agenda/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Agenda
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {agendaList && agendaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha Cita</th>
                <th>Vehiculo</th>
                <th>Proveedor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {agendaList.map((agenda, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/agenda/${agenda.id}`}
                      color="link"
                      size="sm"
                    >
                      {agenda.id}
                    </Button>
                  </td>
                  <td>
                    {agenda.fechaCita ? (
                      <TextFormat
                        type="date"
                        value={agenda.fechaCita}
                        format={APP_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td>
                    {agenda.vehiculo ? (
                      <Link to={`/vehiculo/${agenda.vehiculo.id}`}>
                        {agenda.vehiculo.numPlaca}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {agenda.proveedor ? (
                      <Link to={`/proveedor/${agenda.proveedor.id}`}>
                        {agenda.proveedor.razonSocial}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/agenda/${agenda.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{" "}
                        <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/agenda/${agenda.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{" "}
                        <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/agenda/${agenda.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Agenda found</div>
        )}
      </div>
    </div>
  );
};

export default Agenda;
