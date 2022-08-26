import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./departamento.reducer";

export const DepartamentoDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const departamentoEntity = useAppSelector(
    (state) => state.departamento.entity
  );
  const updateSuccess = useAppSelector(
    (state) => state.departamento.updateSuccess
  );

  const handleClose = () => {
    props.history.push("/departamento");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(departamentoEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader
        toggle={handleClose}
        data-cy="departamentoDeleteDialogHeading"
      >
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="controlLlantasApp.departamento.delete.question">
        Are you sure you want to delete this Departamento?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button
          id="jhi-confirm-delete-departamento"
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

export default DepartamentoDeleteDialog;
