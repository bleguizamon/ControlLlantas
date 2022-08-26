import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import {} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./conductor.reducer";

export const ConductorDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const conductorEntity = useAppSelector((state) => state.conductor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="conductorDetailsHeading">Conductor</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{conductorEntity.id}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{conductorEntity.nombre}</dd>
          <dt>
            <span id="apellido">Apellido</span>
          </dt>
          <dd>{conductorEntity.apellido}</dd>
          <dt>
            <span id="numDocumento">Num Documento</span>
          </dt>
          <dd>{conductorEntity.numDocumento}</dd>
          <dt>
            <span id="tipoDocumento">Tipo Documento</span>
          </dt>
          <dd>{conductorEntity.tipoDocumento}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{conductorEntity.email}</dd>
          <dt>
            <span id="telefono">Telefono</span>
          </dt>
          <dd>{conductorEntity.telefono}</dd>
        </dl>
        <Button
          tag={Link}
          to="/conductor"
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
          to={`/conductor/${conductorEntity.id}/edit`}
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

export default ConductorDetail;
