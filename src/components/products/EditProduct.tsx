import { Dialog, IconButton } from "@radix-ui/themes";
import { ProductForm } from "./ProductForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { NewProduct } from "../../types/product";

type EditProductProps = {
  product: NewProduct;
};

export const EditProduct = ({ product }: EditProductProps) => {
  const { mutate: updateProduct } = useUpdateProduct();

  const handleSave = (product: any) => {
    updateProduct(product, {
      onSuccess: () => {
        // setOriginalProduct(editedProduct);
      },
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton size={"1"} radius="full">
          <FontAwesomeIcon size="xs" icon={faEdit} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>EDITAR PRODUCTO</Dialog.Title>
        <Dialog.Description>EDITA EL PRODUCTO</Dialog.Description>
        <ProductForm product={product} onSave={handleSave} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
