import { Timestamp } from "firebase/firestore/lite";
import { Category } from "./categories";

export interface Product {
  id: string;
  category?: Category | null;
  name: string;
  description?: string;
  price: number;
  price_discount?: number;
  availability?: boolean;
  imageUrl?: string;
  createdAt: Timestamp;
  isVegan?: Boolean;
  isVegetarian?: Boolean;
  isGlutenFree?: Boolean;
  isLactoseFree?: Boolean;
}

export type NewProduct = Omit<Product, "id" | "createdAt">;
