import { IMunicipio } from "app/shared/model/municipio.model";
import { IDepartamento } from "app/shared/model/departamento.model";

export interface IProveedor {
  id?: number;
  nit?: string | null;
  razonSocial?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  horarioLaboral?: string | null;
  municipio?: IMunicipio | null;
  departamento?: IDepartamento | null;
}

export const defaultValue: Readonly<IProveedor> = {};
