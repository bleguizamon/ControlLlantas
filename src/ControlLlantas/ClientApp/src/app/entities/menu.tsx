import React from "react";

import MenuItem from "app/shared/layout/menus/menu-item";

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}

      <MenuItem icon="asterisk" to="/conductor">
        Conductor
      </MenuItem>
      <MenuItem icon="asterisk" to="/vehiculo">
        Vehiculo
      </MenuItem>
      <MenuItem icon="asterisk" to="/departamento">
        Departamento
      </MenuItem>
      <MenuItem icon="asterisk" to="/municipio">
        Municipio
      </MenuItem>
      <MenuItem icon="asterisk" to="/proveedor">
        Proveedor
      </MenuItem>
      <MenuItem icon="asterisk" to="/agenda">
        Agenda
      </MenuItem>
      <MenuItem icon="asterisk" to="/ruta">
        Ruta
      </MenuItem>
      <MenuItem icon="asterisk" to="/ruta-vehiculo">
        Ruta Vehiculo
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
