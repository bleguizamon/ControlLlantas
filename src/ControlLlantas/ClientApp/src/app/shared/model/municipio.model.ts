import { IDepartamento } from "app/shared/model/departamento.model";

export interface IMunicipio {
  id?: number;
  codigo?: number | null;
  nombre?: string | null;
  departamento?: IDepartamento | null;
}

export const defaultValue: Readonly<IMunicipio> = {};
