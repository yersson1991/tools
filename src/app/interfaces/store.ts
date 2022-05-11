import { Product } from './products';

export interface Store {
  idUser: string;
  owner: string;
  name: string;
  location: Array<Number>;
  cellPhone?: string;
  localPhone?: string;
  photoURL?: string;
  products: Array<Product>;
  address: string;
}