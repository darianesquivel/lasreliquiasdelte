import { Dialog, IconButton } from "@radix-ui/themes";
import { ProductForm } from "./ProductForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";
import { NewProduct } from "../../types/product";
import { toast } from "react-toastify";
import { useState } from "react";

type EditProductProps = {
  product: NewProduct;
};

export const EditProduct = ({ product }: EditProductProps) => {
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const [open, setOpen] = useState(false);

  const handleSave = (product: any) => {
    updateProduct(product, {
      onSuccess: () => {
        toast("Producto actualizado correctamente");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton size="1" radius="full">
          <FontAwesomeIcon size="xs" icon={faEdit} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>EDITAR PRODUCTO</Dialog.Title>
        <Dialog.Description>EDITA EL PRODUCTO</Dialog.Description>
        <ProductForm
          product={product}
          onSave={handleSave}
          isPending={isPending}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};
