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

import { IConductor } from "app/shared/model/conductor.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./conductor.reducer";

export const ConductorUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const conductorEntity = useAppSelector((state) => state.conductor.entity);
  const loading = useAppSelector((state) => state.conductor.loading);
  const updating = useAppSelector((state) => state.conductor.updating);
  const updateSuccess = useAppSelector(
    (state) => state.conductor.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/conductor");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    const entity = {
      ...conductorEntity,
      ...values,
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
          ...conductorEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="controlLlantasApp.conductor.home.createOrEditLabel"
            data-cy="ConductorCreateUpdateHeading"
          >
            Create or edit a Conductor
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
                  id="conductor-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Nombre"
                id="conductor-nombre"
                name="nombre"
                data-cy="nombre"
                type="text"
              />
              <ValidatedField
                label="Apellido"
                id="conductor-apellido"
                name="apellido"
                data-cy="apellido"
                type="text"
              />
              <ValidatedField
                label="Num Documento"
                id="conductor-numDocumento"
                name="numDocumento"
                data-cy="numDocumento"
                type="text"
              />
              <ValidatedField
                label="Tipo Documento"
                id="conductor-tipoDocumento"
                name="tipoDocumento"
                data-cy="tipoDocumento"
                type="text"
              />
              <ValidatedField
                label="Email"
                id="conductor-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label="Telefono"
                id="conductor-telefono"
                name="telefono"
                data-cy="telefono"
                type="text"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/conductor"
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

export default ConductorUpdate;
