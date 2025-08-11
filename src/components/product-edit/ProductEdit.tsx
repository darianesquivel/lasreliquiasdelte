import { Dialog, IconButton } from "@radix-ui/themes";
import { ProductForm } from "../product-form/ProductForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";

type ProductEditProps = {
  product: any;
};

export const ProductEdit = ({ product }: ProductEditProps) => {
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
