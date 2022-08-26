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
import { getEntities as getConductors } from "app/entities/conductor/conductor.reducer";
import { IVehiculo } from "app/shared/model/vehiculo.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./vehiculo.reducer";

export const VehiculoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const conductors = useAppSelector((state) => state.conductor.entities);
  const vehiculoEntity = useAppSelector((state) => state.vehiculo.entity);
  const loading = useAppSelector((state) => state.vehiculo.loading);
  const updating = useAppSelector((state) => state.vehiculo.updating);
  const updateSuccess = useAppSelector((state) => state.vehiculo.updateSuccess);
  const handleClose = () => {
    props.history.push("/vehiculo");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getConductors({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    const entity = {
      ...vehiculoEntity,
      ...values,
      conductor: conductors.find(
        (it) => it.id.toString() === values.conductor.toString()
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
          ...vehiculoEntity,
          conductor: vehiculoEntity?.conductor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="controlLlantasApp.vehiculo.home.createOrEditLabel"
            data-cy="VehiculoCreateUpdateHeading"
          >
            Create or edit a Vehiculo
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
                  id="vehiculo-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Num Placa"
                id="vehiculo-numPlaca"
                name="numPlaca"
                data-cy="numPlaca"
                type="text"
                validate={{
                  required: { value: true, message: "This field is required." },
                }}
              />
              <ValidatedField
                label="Num Pasajeros"
                id="vehiculo-numPasajeros"
                name="numPasajeros"
                data-cy="numPasajeros"
                type="text"
              />
              <ValidatedField
                label="Motor"
                id="vehiculo-motor"
                name="motor"
                data-cy="motor"
                type="text"
              />
              <ValidatedField
                label="Modelo"
                id="vehiculo-modelo"
                name="modelo"
                data-cy="modelo"
                type="text"
              />
              <ValidatedField
                label="Marca"
                id="vehiculo-marca"
                name="marca"
                data-cy="marca"
                type="text"
              />
              <ValidatedField
                label="Num Ejes"
                id="vehiculo-numEjes"
                name="numEjes"
                data-cy="numEjes"
                type="text"
              />
              <ValidatedField
                label="Kilometraje"
                id="vehiculo-kilometraje"
                name="kilometraje"
                data-cy="kilometraje"
                type="text"
              />
              <ValidatedField
                id="vehiculo-conductor"
                name="conductor"
                data-cy="conductor"
                label="Conductor"
                type="select"
              >
                <option value="" key="0" />
                {conductors
                  ? conductors.map((otherEntity) => (
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
                to="/vehiculo"
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

export default VehiculoUpdate;
