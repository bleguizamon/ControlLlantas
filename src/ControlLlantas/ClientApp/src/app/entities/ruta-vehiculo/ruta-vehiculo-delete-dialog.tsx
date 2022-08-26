import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./ruta-vehiculo.reducer";

export const RutaVehiculoDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const rutaVehiculoEntity = useAppSelector(
    (state) => state.rutaVehiculo.entity
  );
  const updateSuccess = useAppSelector(
    (state) => state.rutaVehiculo.updateSuccess
  );

  const handleClose = () => {
    props.history.push("/ruta-vehiculo");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(rutaVehiculoEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader
        toggle={handleClose}
        data-cy="rutaVehiculoDeleteDialogHeading"
      >
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="controlLlantasApp.rutaVehiculo.delete.question">
        Are you sure you want to delete this RutaVehiculo?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button
          id="jhi-confirm-delete-rutaVehiculo"
          data-cy="entityConfirmDeleteButton"
          color="danger"
          onClick={confirmDelete}
        >
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RutaVehiculoDeleteDialog;
