import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IProveedor } from "app/shared/model/proveedor.model";
import { getEntities } from "./proveedor.reducer";

export const Proveedor = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const proveedorList = useAppSelector((state) => state.proveedor.entities);
  const loading = useAppSelector((state) => state.proveedor.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="proveedor-heading" data-cy="ProveedorHeading">
        Proveedors
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            color="info"
            onClick={handleSyncList}
            disabled={loading}
          >
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link
            to="/proveedor/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Proveedor
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {proveedorList && proveedorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nit</th>
                <th>Razon Social</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Horario Laboral</th>
                <th>Municipio</th>
                <th>Departamento</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proveedorList.map((proveedor, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/proveedor/${proveedor.id}`}
                      color="link"
                      size="sm"
                    >
                      {proveedor.id}
                    </Button>
                  </td>
                  <td>{proveedor.nit}</td>
                  <td>{proveedor.razonSocial}</td>
                  <td>{proveedor.direccion}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.horarioLaboral}</td>
                  <td>
                    {proveedor.municipio ? (
                      <Link to={`/municipio/${proveedor.municipio.id}`}>
                        {proveedor.municipio.nombre}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {proveedor.departamento ? (
                      <Link to={`/departamento/${proveedor.departamento.id}`}>
                        {proveedor.departamento.nombre}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/proveedor/${proveedor.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{" "}
                        <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/proveedor/${proveedor.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{" "}
                        <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/proveedor/${proveedor.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{" "}
                        <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">No Proveedors found</div>
          )
        )}
      </div>
    </div>
  );
};

export default Proveedor;
