import { ProductTypes } from "./productTypes";

export interface Product {
  id: string;
  type: ProductTypes;
  name: string;
  description: string;
  price: number;
  price_discount: number | null;
  availability: boolean;
  imageUrl: string;
}

export type NewProduct = Omit<Product, "id">;
