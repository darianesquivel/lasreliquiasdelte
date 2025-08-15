import { doc, updateDoc } from "@firebase/firestore/lite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase/firebase";
import { type Product } from "../../types/product";

async function updateProduct(product: Product): Promise<void> {
  const { id, ...data } = product;
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, data);
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
