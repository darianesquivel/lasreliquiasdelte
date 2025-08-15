import { Button, Dialog } from "@radix-ui/themes";
import { useCreateCategory } from "../../hooks/categories/useCreateCategory";
import { CategoryForm } from "./CategoryForm";
import { NewCategory } from "../../types/categories";

export const CreateCategory = () => {
  const { mutate: createCategory } = useCreateCategory();

  const handleSave = (category: NewCategory) => {
    createCategory(category, {
      onSuccess: () => {
        // setOriginalProduct(newProduct);
      },
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="green">CREAR CATEGORIA</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>CREAR CATEGORIA</Dialog.Title>
        <Dialog.Description>NOMBRE DE LA CATEGORIA </Dialog.Description>
        <CategoryForm onSave={handleSave} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
