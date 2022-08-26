import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import {} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./vehiculo.reducer";

export const VehiculoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const vehiculoEntity = useAppSelector((state) => state.vehiculo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehiculoDetailsHeading">Vehiculo</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{vehiculoEntity.id}</dd>
          <dt>
            <span id="numPlaca">Num Placa</span>
          </dt>
          <dd>{vehiculoEntity.numPlaca}</dd>
          <dt>
            <span id="numPasajeros">Num Pasajeros</span>
          </dt>
          <dd>{vehiculoEntity.numPasajeros}</dd>
          <dt>
            <span id="motor">Motor</span>
          </dt>
          <dd>{vehiculoEntity.motor}</dd>
          <dt>
            <span id="modelo">Modelo</span>
          </dt>
          <dd>{vehiculoEntity.modelo}</dd>
          <dt>
            <span id="marca">Marca</span>
          </dt>
          <dd>{vehiculoEntity.marca}</dd>
          <dt>
            <span id="numEjes">Num Ejes</span>
          </dt>
          <dd>{vehiculoEntity.numEjes}</dd>
          <dt>
            <span id="kilometraje">Kilometraje</span>
          </dt>
          <dd>{vehiculoEntity.kilometraje}</dd>
          <dt>Conductor</dt>
          <dd>
            {vehiculoEntity.conductor ? vehiculoEntity.conductor.nombre : ""}
          </dd>
        </dl>
        <Button
          tag={Link}
          to="/vehiculo"
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
          to={`/vehiculo/${vehiculoEntity.id}/edit`}
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

export default VehiculoDetail;
