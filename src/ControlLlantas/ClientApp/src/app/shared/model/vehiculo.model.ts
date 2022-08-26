import { IConductor } from "app/shared/model/conductor.model";

export interface IVehiculo {
  id?: number;
  numPlaca?: string;
  numPasajeros?: number | null;
  motor?: string | null;
  modelo?: string | null;
  marca?: string | null;
  numEjes?: number | null;
  kilometraje?: number | null;
  conductor?: IConductor | null;
}

export const defaultValue: Readonly<IVehiculo> = {};
