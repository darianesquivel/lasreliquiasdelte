import { Timestamp } from "firebase/firestore/lite";

export type ProductCategory =
  | "cafeteria"
  | "te"
  | "pudineria"
  | "panaderia"
  | "salado"
  | "adicionales"
  | "jugos"
  | "otro";

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  description: string;
  price: number;
  price_discount: number | null;
  availability: boolean;
  imageUrl: string;
  createdAt: Timestamp;
  isVegan: Boolean;
  isVegetarian: Boolean;
  isGlutenFree: Boolean;
  isLactoseFree: Boolean;
}

export type NewProduct = Omit<Product, "id" | "createdAt">;
