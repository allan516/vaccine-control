import { Vaccine } from './vaccine';

export interface Pet {
  _id: string;
  name: string;
  age: number;
  vaccines: Vaccine[];
}
