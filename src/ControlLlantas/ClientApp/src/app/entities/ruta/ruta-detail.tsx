import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import {} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./ruta.reducer";

export const RutaDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const rutaEntity = useAppSelector((state) => state.ruta.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="rutaDetailsHeading">Ruta</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{rutaEntity.id}</dd>
          <dt>
            <span id="nombreRuta">Nombre Ruta</span>
          </dt>
          <dd>{rutaEntity.nombreRuta}</dd>
          <dt>
            <span id="ciudadInicio">Ciudad Inicio</span>
          </dt>
          <dd>{rutaEntity.ciudadInicio}</dd>
          <dt>
            <span id="ciudadFin">Ciudad Fin</span>
          </dt>
          <dd>{rutaEntity.ciudadFin}</dd>
          <dt>
            <span id="kilometraje">Kilometraje</span>
          </dt>
          <dd>{rutaEntity.kilometraje}</dd>
        </dl>
        <Button
          tag={Link}
          to="/ruta"
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
          to={`/ruta/${rutaEntity.id}/edit`}
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

export default RutaDetail;
