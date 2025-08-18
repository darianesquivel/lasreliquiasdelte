import { Button, Dialog } from "@radix-ui/themes";
import { useCreateCategory } from "../../hooks/categories/useCreateCategory";
import { CategoryForm } from "./CategoryForm";
import { NewCategory } from "../../types/categories";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateCategory = () => {
  const { mutate: createCategory } = useCreateCategory();
  const [open, setOpen] = useState(false);

  const handleSave = (category: NewCategory) => {
    createCategory(category, {
      onSuccess: () => {
        toast("Categoria creada correctamente");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color="green">CREAR CATEGORIA</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>CREAR CATEGORIA</Dialog.Title>
        <Dialog.Description>NOMBRE DE LA CATEGORIA</Dialog.Description>
        <CategoryForm onSave={handleSave} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
