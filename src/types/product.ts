export interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  price_discount: number | null;
  availability: boolean;
  imageUrl: string;
}
