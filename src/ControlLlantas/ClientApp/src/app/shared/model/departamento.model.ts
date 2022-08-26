export interface IDepartamento {
  id?: number;
  codigo?: number | null;
  nombre?: string | null;
}

export const defaultValue: Readonly<IDepartamento> = {};
