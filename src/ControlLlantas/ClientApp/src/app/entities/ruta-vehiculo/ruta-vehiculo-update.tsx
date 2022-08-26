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
import { IRuta } from "app/shared/model/ruta.model";
import { getEntities as getRutas } from "app/entities/ruta/ruta.reducer";
import { IRutaVehiculo } from "app/shared/model/ruta-vehiculo.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./ruta-vehiculo.reducer";

export const RutaVehiculoUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const vehiculos = useAppSelector((state) => state.vehiculo.entities);
  const rutas = useAppSelector((state) => state.ruta.entities);
  const rutaVehiculoEntity = useAppSelector(
    (state) => state.rutaVehiculo.entity
  );
  const loading = useAppSelector((state) => state.rutaVehiculo.loading);
  const updating = useAppSelector((state) => state.rutaVehiculo.updating);
  const updateSuccess = useAppSelector(
    (state) => state.rutaVehiculo.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/ruta-vehiculo");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getVehiculos({}));
    dispatch(getRutas({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    values.feha = convertDateTimeToServer(values.feha);

    const entity = {
      ...rutaVehiculoEntity,
      ...values,
      vehiculo: vehiculos.find(
        (it) => it.id.toString() === values.vehiculo.toString()
      ),
      ruta: rutas.find((it) => it.id.toString() === values.ruta.toString()),
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
          feha: displayDefaultDateTime(),
        }
      : {
          ...rutaVehiculoEntity,
          feha: convertDateTimeFromServer(rutaVehiculoEntity.feha),
          vehiculo: rutaVehiculoEntity?.vehiculo?.id,
          ruta: rutaVehiculoEntity?.ruta?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="controlLlantasApp.rutaVehiculo.home.createOrEditLabel"
            data-cy="RutaVehiculoCreateUpdateHeading"
          >
            Create or edit a RutaVehiculo
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
                  id="ruta-vehiculo-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Feha"
                id="ruta-vehiculo-feha"
                name="feha"
                data-cy="feha"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="ruta-vehiculo-vehiculo"
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
                id="ruta-vehiculo-ruta"
                name="ruta"
                data-cy="ruta"
                label="Ruta"
                type="select"
              >
                <option value="" key="0" />
                {rutas
                  ? rutas.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombreRuta}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/ruta-vehiculo"
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

export default RutaVehiculoUpdate;
