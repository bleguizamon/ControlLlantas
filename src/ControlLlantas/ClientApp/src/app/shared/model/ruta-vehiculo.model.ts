import dayjs from "dayjs";
import { IVehiculo } from "app/shared/model/vehiculo.model";
import { IRuta } from "app/shared/model/ruta.model";

export interface IRutaVehiculo {
  id?: number;
  feha?: string | null;
  vehiculo?: IVehiculo | null;
  ruta?: IRuta | null;
}

export const defaultValue: Readonly<IRutaVehiculo> = {};
