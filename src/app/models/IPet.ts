import { IVaccine } from './IVaccine';

export interface IPet {
  _id: string;
  name: string;
  age: number;
  category: string;
  breed: string;
  vaccines: IVaccine[];
}
