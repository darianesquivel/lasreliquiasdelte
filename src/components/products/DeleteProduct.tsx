import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import { useDeleteProduct } from "../../hooks/products/useDeleteProduct";
import { toast } from "react-toastify";

type DeleteProductProps = {
  id: string;
};

export const DeleteProduct = ({ id }: DeleteProductProps) => {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        toast("Producto eliminado");
      },
    });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton radius="full" size="1" color="red">
          <FontAwesomeIcon size="xs" icon={faTrash} />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Eliminar producto</AlertDialog.Title>
        <AlertDialog.Description>
          Estas seguro que queres eliminar este producto?
        </AlertDialog.Description>
        <Flex gap="2">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleDelete}
              disabled={isPending}
            >
              Eliminar producto
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
