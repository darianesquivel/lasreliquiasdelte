import { collection, addDoc, serverTimestamp } from "@firebase/firestore/lite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase/firebase";
import { NewCategory } from "../../types/categories";

async function createCategory(category: NewCategory): Promise<void> {
  const categoriesCol = collection(db, "categories");
  await addDoc(categoriesCol, {
    ...category,
    createdAt: serverTimestamp(),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
