import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./ruta-vehiculo.reducer";

export const RutaVehiculoDetail = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const rutaVehiculoEntity = useAppSelector(
    (state) => state.rutaVehiculo.entity
  );
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="rutaVehiculoDetailsHeading">RutaVehiculo</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{rutaVehiculoEntity.id}</dd>
          <dt>
            <span id="feha">Feha</span>
          </dt>
          <dd>
            {rutaVehiculoEntity.feha ? (
              <TextFormat
                value={rutaVehiculoEntity.feha}
                type="date"
                format={APP_DATE_FORMAT}
              />
            ) : null}
          </dd>
          <dt>Vehiculo</dt>
          <dd>
            {rutaVehiculoEntity.vehiculo
              ? rutaVehiculoEntity.vehiculo.numPlaca
              : ""}
          </dd>
          <dt>Ruta</dt>
          <dd>
            {rutaVehiculoEntity.ruta ? rutaVehiculoEntity.ruta.nombreRuta : ""}
          </dd>
        </dl>
        <Button
          tag={Link}
          to="/ruta-vehiculo"
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
          to={`/ruta-vehiculo/${rutaVehiculoEntity.id}/edit`}
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

export default RutaVehiculoDetail;
