import { Vaccine } from './vaccine';

export interface Pet {
  _id?: string;
  name?: string;
  age?: number;
  vaccines?: Vaccine[];
  id?: string;
  code?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
