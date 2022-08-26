export interface IConductor {
  id?: number;
  nombre?: string | null;
  apellido?: string | null;
  numDocumento?: string | null;
  tipoDocumento?: string | null;
  email?: string | null;
  telefono?: string | null;
}

export const defaultValue: Readonly<IConductor> = {};
