export interface IRuta {
  id?: number;
  nombreRuta?: string | null;
  ciudadInicio?: string | null;
  ciudadFin?: string | null;
  kilometraje?: number | null;
}

export const defaultValue: Readonly<IRuta> = {};
