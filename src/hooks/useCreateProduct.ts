import { collection, addDoc, serverTimestamp } from "@firebase/firestore/lite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../firebase/firebase";
import { type NewProduct } from "../types/product";

async function createProduct(product: NewProduct): Promise<void> {
  const productsCol = collection(db, "products");
  await addDoc(productsCol, {
    ...product,
    createdAt: serverTimestamp(),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
