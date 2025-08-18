import { Button, Dialog } from "@radix-ui/themes";
import { ProductForm } from "./ProductForm";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";
import { NewProduct } from "../../types/product";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateProduct = () => {
  const { mutate: createProduct, isPending } = useCreateProduct();
  const [open, setOpen] = useState(false);

  const handleSave = (newProduct: NewProduct) => {
    createProduct(newProduct, {
      onSuccess: () => {
        toast("Producto creado correctamente");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color="green">CREAR PRODUCTO</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>AGREGAR PRODUCTO</Dialog.Title>
        <Dialog.Description>
          COMPLETA LOS DATOS DEL NUEVO PRODUCTO
        </Dialog.Description>
        <ProductForm onSave={handleSave} isPending={isPending} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
