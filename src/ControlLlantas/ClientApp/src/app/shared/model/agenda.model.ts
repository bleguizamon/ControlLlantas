import dayjs from "dayjs";
import { IVehiculo } from "app/shared/model/vehiculo.model";
import { IProveedor } from "app/shared/model/proveedor.model";

export interface IAgenda {
  id?: number;
  fechaCita?: string;
  vehiculo?: IVehiculo | null;
  proveedor?: IProveedor | null;
}

export const defaultValue: Readonly<IAgenda> = {};
