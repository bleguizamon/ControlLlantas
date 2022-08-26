import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, FormText } from "reactstrap";
import { isNumber, ValidatedField, ValidatedForm } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from "app/shared/util/date-utils";
import { mapIdList } from "app/shared/util/entity-utils";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IMunicipio } from "app/shared/model/municipio.model";
import { getEntities as getMunicipios } from "app/entities/municipio/municipio.reducer";
import { IDepartamento } from "app/shared/model/departamento.model";
import { getEntities as getDepartamentos } from "app/entities/departamento/departamento.reducer";
import { IProveedor } from "app/shared/model/proveedor.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./proveedor.reducer";

export const ProveedorUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const municipios = useAppSelector((state) => state.municipio.entities);
  const departamentos = useAppSelector((state) => state.departamento.entities);
  const proveedorEntity = useAppSelector((state) => state.proveedor.entity);
  const loading = useAppSelector((state) => state.proveedor.loading);
  const updating = useAppSelector((state) => state.proveedor.updating);
  const updateSuccess = useAppSelector(
    (state) => state.proveedor.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/proveedor");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getMunicipios({}));
    dispatch(getDepartamentos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    const entity = {
      ...proveedorEntity,
      ...values,
      municipio: municipios.find(
        (it) => it.id.toString() === values.municipio.toString()
      ),
      departamento: departamentos.find(
        (it) => it.id.toString() === values.departamento.toString()
      ),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...proveedorEntity,
          municipio: proveedorEntity?.municipio?.id,
          departamento: proveedorEntity?.departamento?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="controlLlantasApp.proveedor.home.createOrEditLabel"
            data-cy="ProveedorCreateUpdateHeading"
          >
            Create or edit a Proveedor
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="proveedor-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Nit"
                id="proveedor-nit"
                name="nit"
                data-cy="nit"
                type="text"
              />
              <ValidatedField
                label="Razon Social"
                id="proveedor-razonSocial"
                name="razonSocial"
                data-cy="razonSocial"
                type="text"
              />
              <ValidatedField
                label="Direccion"
                id="proveedor-direccion"
                name="direccion"
                data-cy="direccion"
                type="text"
              />
              <ValidatedField
                label="Telefono"
                id="proveedor-telefono"
                name="telefono"
                data-cy="telefono"
                type="text"
              />
              <ValidatedField
                label="Horario Laboral"
                id="proveedor-horarioLaboral"
                name="horarioLaboral"
                data-cy="horarioLaboral"
                type="text"
              />
              <ValidatedField
                id="proveedor-municipio"
                name="municipio"
                data-cy="municipio"
                label="Municipio"
                type="select"
              >
                <option value="" key="0" />
                {municipios
                  ? municipios.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="proveedor-departamento"
                name="departamento"
                data-cy="departamento"
                label="Departamento"
                type="select"
              >
                <option value="" key="0" />
                {departamentos
                  ? departamentos.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/proveedor"
                replace
                color="info"
              >
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
              >
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProveedorUpdate;
