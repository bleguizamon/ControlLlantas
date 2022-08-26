import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./municipio.reducer";

export const MunicipioDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const municipioEntity = useAppSelector((state) => state.municipio.entity);
  const updateSuccess = useAppSelector(
    (state) => state.municipio.updateSuccess
  );

  const handleClose = () => {
    props.history.push("/municipio");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(municipioEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="municipioDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="controlLlantasApp.municipio.delete.question">
        Are you sure you want to delete this Municipio?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button
          id="jhi-confirm-delete-municipio"
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

export default MunicipioDeleteDialog;
