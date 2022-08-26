import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./ruta.reducer";

export const RutaDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const rutaEntity = useAppSelector((state) => state.ruta.entity);
  const updateSuccess = useAppSelector((state) => state.ruta.updateSuccess);

  const handleClose = () => {
    props.history.push("/ruta");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(rutaEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="rutaDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="controlLlantasApp.ruta.delete.question">
        Are you sure you want to delete this Ruta?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button
          id="jhi-confirm-delete-ruta"
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

export default RutaDeleteDialog;
