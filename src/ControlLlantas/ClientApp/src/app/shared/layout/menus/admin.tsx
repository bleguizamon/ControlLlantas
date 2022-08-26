import React from "react";
import MenuItem from "app/shared/layout/menus/menu-item";
import { DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavDropdown } from "./menu-components";

const openAPIItem = () => (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

export const AdminMenu = ({ showOpenAPI, showDatabase }) => (
  <NavDropdown
    icon="users-cog"
    name="Swagger"
    id="admin-menu"
    data-cy="adminMenu"
  >
 
    {showOpenAPI && openAPIItem()}


  </NavDropdown>
);

export default AdminMenu;
