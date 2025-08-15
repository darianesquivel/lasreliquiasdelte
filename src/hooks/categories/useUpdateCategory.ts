import { doc, updateDoc } from "@firebase/firestore/lite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase/firebase";
import { type Category } from "../../types/categories";

async function updateCategory(category: Category): Promise<void> {
  const { id, ...data } = category;
  const categoryRef = doc(db, "categories", id);
  await updateDoc(categoryRef, data);
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
