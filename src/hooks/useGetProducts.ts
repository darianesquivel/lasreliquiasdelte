import { collection, getDocs } from "@firebase/firestore/lite";
import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebase";
import { type Product } from "../types/product";

async function getProducts(): Promise<Product[]> {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);

  const productsList: Product[] = productsSnapshot.docs.map((doc) => ({
    id: doc.id, // el id que genera Firestore
    ...doc.data(),
  })) as Product[];

  return productsList;
}

export function useGetProduct() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
