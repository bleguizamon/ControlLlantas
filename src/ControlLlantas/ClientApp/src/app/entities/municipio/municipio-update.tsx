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

import { IDepartamento } from "app/shared/model/departamento.model";
import { getEntities as getDepartamentos } from "app/entities/departamento/departamento.reducer";
import { IMunicipio } from "app/shared/model/municipio.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./municipio.reducer";

export const MunicipioUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const departamentos = useAppSelector((state) => state.departamento.entities);
  const municipioEntity = useAppSelector((state) => state.municipio.entity);
  const loading = useAppSelector((state) => state.municipio.loading);
  const updating = useAppSelector((state) => state.municipio.updating);
  const updateSuccess = useAppSelector(
    (state) => state.municipio.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/municipio");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getDepartamentos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    const entity = {
      ...municipioEntity,
      ...values,
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
          ...municipioEntity,
          departamento: municipioEntity?.departamento?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="controlLlantasApp.municipio.home.createOrEditLabel"
            data-cy="MunicipioCreateUpdateHeading"
          >
            Create or edit a Municipio
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
                  id="municipio-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Codigo"
                id="municipio-codigo"
                name="codigo"
                data-cy="codigo"
                type="text"
              />
              <ValidatedField
                label="Nombre"
                id="municipio-nombre"
                name="nombre"
                data-cy="nombre"
                type="text"
              />
              <ValidatedField
                id="municipio-departamento"
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
                to="/municipio"
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

export default MunicipioUpdate;
