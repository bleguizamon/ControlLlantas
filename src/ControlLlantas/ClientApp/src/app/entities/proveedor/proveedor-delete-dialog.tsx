import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./proveedor.reducer";

export const ProveedorDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const proveedorEntity = useAppSelector((state) => state.proveedor.entity);
  const updateSuccess = useAppSelector(
    (state) => state.proveedor.updateSuccess
  );

  const handleClose = () => {
    props.history.push("/proveedor");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(proveedorEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="proveedorDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="controlLlantasApp.proveedor.delete.question">
        Are you sure you want to delete this Proveedor?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button
          id="jhi-confirm-delete-proveedor"
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

export default ProveedorDeleteDialog;
