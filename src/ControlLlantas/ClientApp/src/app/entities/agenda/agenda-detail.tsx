import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./agenda.reducer";

export const AgendaDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const agendaEntity = useAppSelector((state) => state.agenda.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="agendaDetailsHeading">Agenda</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{agendaEntity.id}</dd>
          <dt>
            <span id="fechaCita">Fecha Cita</span>
          </dt>
          <dd>
            {agendaEntity.fechaCita ? (
              <TextFormat
                value={agendaEntity.fechaCita}
                type="date"
                format={APP_DATE_FORMAT}
              />
            ) : null}
          </dd>
          <dt>Vehiculo</dt>
          <dd>{agendaEntity.vehiculo ? agendaEntity.vehiculo.numPlaca : ""}</dd>
          <dt>Proveedor</dt>
          <dd>
            {agendaEntity.proveedor ? agendaEntity.proveedor.razonSocial : ""}
          </dd>
        </dl>
        <Button
          tag={Link}
          to="/agenda"
          replace
          color="info"
          data-cy="entityDetailsBackButton"
        >
          <FontAwesomeIcon icon="arrow-left" />{" "}
          <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button
          tag={Link}
          to={`/agenda/${agendaEntity.id}/edit`}
          replace
          color="primary"
        >
          <FontAwesomeIcon icon="pencil-alt" />{" "}
          <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AgendaDetail;
