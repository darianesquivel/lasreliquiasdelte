import { doc, deleteDoc } from "@firebase/firestore/lite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase/firebase";

async function deleteCategory(id: string): Promise<void> {
  const categoryRef = doc(db, "categories", id);
  await deleteDoc(categoryRef);
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
