import { doc, deleteDoc } from "@firebase/firestore/lite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase/firebase";

async function deleteProduct(id: string): Promise<void> {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
