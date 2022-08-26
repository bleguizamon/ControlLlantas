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

import { IVehiculo } from "app/shared/model/vehiculo.model";
import { getEntities as getVehiculos } from "app/entities/vehiculo/vehiculo.reducer";
import { IProveedor } from "app/shared/model/proveedor.model";
import { getEntities as getProveedors } from "app/entities/proveedor/proveedor.reducer";
import { IAgenda } from "app/shared/model/agenda.model";
import { getEntity, updateEntity, createEntity, reset } from "./agenda.reducer";

export const AgendaUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const vehiculos = useAppSelector((state) => state.vehiculo.entities);
  const proveedors = useAppSelector((state) => state.proveedor.entities);
  const agendaEntity = useAppSelector((state) => state.agenda.entity);
  const loading = useAppSelector((state) => state.agenda.loading);
  const updating = useAppSelector((state) => state.agenda.updating);
  const updateSuccess = useAppSelector((state) => state.agenda.updateSuccess);
  const handleClose = () => {
    props.history.push("/agenda");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getVehiculos({}));
    dispatch(getProveedors({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    values.fechaCita = convertDateTimeToServer(values.fechaCita);

    const entity = {
      ...agendaEntity,
      ...values,
      vehiculo: vehiculos.find(
        (it) => it.id.toString() === values.vehiculo.toString()
      ),
      proveedor: proveedors.find(
        (it) => it.id.toString() === values.proveedor.toString()
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
      ? {
          fechaCita: displayDefaultDateTime(),
        }
      : {
          ...agendaEntity,
          fechaCita: convertDateTimeFromServer(agendaEntity.fechaCita),
          vehiculo: agendaEntity?.vehiculo?.id,
          proveedor: agendaEntity?.proveedor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="controlLlantasApp.agenda.home.createOrEditLabel"
            data-cy="AgendaCreateUpdateHeading"
          >
            Create or edit a Agenda
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
                  id="agenda-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Fecha Cita"
                id="agenda-fechaCita"
                name="fechaCita"
                data-cy="fechaCita"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: "This field is required." },
                }}
              />
              <ValidatedField
                id="agenda-vehiculo"
                name="vehiculo"
                data-cy="vehiculo"
                label="Vehiculo"
                type="select"
              >
                <option value="" key="0" />
                {vehiculos
                  ? vehiculos.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.numPlaca}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="agenda-proveedor"
                name="proveedor"
                data-cy="proveedor"
                label="Proveedor"
                type="select"
              >
                <option value="" key="0" />
                {proveedors
                  ? proveedors.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.razonSocial}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/agenda"
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

export default AgendaUpdate;
