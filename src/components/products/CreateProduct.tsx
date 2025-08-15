import { Button, Dialog } from "@radix-ui/themes";
import { ProductForm } from "./ProductForm";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";
import { NewProduct } from "../../types/product";

export const CreateProduct = () => {
  const { mutate: createProduct } = useCreateProduct();

  const handleSave = (newProduct: NewProduct) => {
    createProduct(newProduct, {
      onSuccess: () => {
        // setOriginalProduct(newProduct);
      },
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="green">CREAR PRODUCTO</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>AGREGAR PRODUCTO</Dialog.Title>
        <Dialog.Description>
          COMPLETA LOS DATOS DEL NUEVO PRODUCTO
        </Dialog.Description>
        <ProductForm onSave={handleSave} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
