import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import {} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./proveedor.reducer";

export const ProveedorDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const proveedorEntity = useAppSelector((state) => state.proveedor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="proveedorDetailsHeading">Proveedor</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{proveedorEntity.id}</dd>
          <dt>
            <span id="nit">Nit</span>
          </dt>
          <dd>{proveedorEntity.nit}</dd>
          <dt>
            <span id="razonSocial">Razon Social</span>
          </dt>
          <dd>{proveedorEntity.razonSocial}</dd>
          <dt>
            <span id="direccion">Direccion</span>
          </dt>
          <dd>{proveedorEntity.direccion}</dd>
          <dt>
            <span id="telefono">Telefono</span>
          </dt>
          <dd>{proveedorEntity.telefono}</dd>
          <dt>
            <span id="horarioLaboral">Horario Laboral</span>
          </dt>
          <dd>{proveedorEntity.horarioLaboral}</dd>
          <dt>Municipio</dt>
          <dd>
            {proveedorEntity.municipio ? proveedorEntity.municipio.nombre : ""}
          </dd>
          <dt>Departamento</dt>
          <dd>
            {proveedorEntity.departamento
              ? proveedorEntity.departamento.nombre
              : ""}
          </dd>
        </dl>
        <Button
          tag={Link}
          to="/proveedor"
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
          to={`/proveedor/${proveedorEntity.id}/edit`}
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

export default ProveedorDetail;
