import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import {} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./departamento.reducer";

export const DepartamentoDetail = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const departamentoEntity = useAppSelector(
    (state) => state.departamento.entity
  );
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="departamentoDetailsHeading">Departamento</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{departamentoEntity.id}</dd>
          <dt>
            <span id="codigo">Codigo</span>
          </dt>
          <dd>{departamentoEntity.codigo}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{departamentoEntity.nombre}</dd>
        </dl>
        <Button
          tag={Link}
          to="/departamento"
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
          to={`/departamento/${departamentoEntity.id}/edit`}
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

export default DepartamentoDetail;
