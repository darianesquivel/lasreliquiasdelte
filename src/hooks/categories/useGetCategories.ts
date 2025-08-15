import { collection, getDocs } from "@firebase/firestore/lite";
import { useQuery } from "@tanstack/react-query";
import { db } from "../../firebase/firebase";
import { type Category } from "../../types/categories";

async function getCategories(): Promise<Category[]> {
  const categoriesCol = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCol);

  const categoriesList: Category[] = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];

  return categoriesList;
}

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
