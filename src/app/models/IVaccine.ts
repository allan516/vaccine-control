export interface IVaccine {
  id?: string;
  name: string;
  date?: string;
  status?: VaccineStatus;
}

export interface IvaccineStatus {
  name?: string;
  code?: VaccineStatus;
}

export enum VaccineStatus {
  PENDING = 'pendente',
  APPLIED = 'aplicada',
  EXPIRED = 'expirada',
  MISSED = 'perdida',
}
