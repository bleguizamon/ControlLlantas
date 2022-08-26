import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./vehiculo.reducer";

export const VehiculoDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const vehiculoEntity = useAppSelector((state) => state.vehiculo.entity);
  const updateSuccess = useAppSelector((state) => state.vehiculo.updateSuccess);

  const handleClose = () => {
    props.history.push("/vehiculo");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(vehiculoEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="vehiculoDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="controlLlantasApp.vehiculo.delete.question">
        Are you sure you want to delete this Vehiculo?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button
          id="jhi-confirm-delete-vehiculo"
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

export default VehiculoDeleteDialog;
