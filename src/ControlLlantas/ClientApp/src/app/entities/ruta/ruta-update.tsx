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

import { IRuta } from "app/shared/model/ruta.model";
import { getEntity, updateEntity, createEntity, reset } from "./ruta.reducer";

export const RutaUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const rutaEntity = useAppSelector((state) => state.ruta.entity);
  const loading = useAppSelector((state) => state.ruta.loading);
  const updating = useAppSelector((state) => state.ruta.updating);
  const updateSuccess = useAppSelector((state) => state.ruta.updateSuccess);
  const handleClose = () => {
    props.history.push("/ruta");
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
      ...rutaEntity,
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
          ...rutaEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="controlLlantasApp.ruta.home.createOrEditLabel"
            data-cy="RutaCreateUpdateHeading"
          >
            Create or edit a Ruta
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
                  id="ruta-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Nombre Ruta"
                id="ruta-nombreRuta"
                name="nombreRuta"
                data-cy="nombreRuta"
                type="text"
              />
              <ValidatedField
                label="Ciudad Inicio"
                id="ruta-ciudadInicio"
                name="ciudadInicio"
                data-cy="ciudadInicio"
                type="text"
              />
              <ValidatedField
                label="Ciudad Fin"
                id="ruta-ciudadFin"
                name="ciudadFin"
                data-cy="ciudadFin"
                type="text"
              />
              <ValidatedField
                label="Kilometraje"
                id="ruta-kilometraje"
                name="kilometraje"
                data-cy="kilometraje"
                type="text"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/ruta"
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

export default RutaUpdate;
