import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";
import { toast } from "react-toastify";

type DeleteCategoryProps = {
  id: string;
};

export const DeleteCategory = ({ id }: DeleteCategoryProps) => {
  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory();
  const { data: products } = useGetProducts();
  const { mutate: updateProduct } = useUpdateProduct();

  const handleDelete = async () => {
    const productsToUpdate = products?.filter(
      (product) => product?.category?.id === id
    );

    if (productsToUpdate?.length) {
      await Promise.all(
        productsToUpdate.map((product) =>
          updateProduct({ ...product, category: null })
        )
      );
    }

    await deleteCategory(id, {
      onSuccess: () => {
        toast("Categoria eliminada");
      },
    });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton radius="full" size={"1"} color="red">
          <FontAwesomeIcon size="xs" icon={faTrash} />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Eliminar Categoria</AlertDialog.Title>
        <AlertDialog.Description>
          Estas seguro que queres eliminar esta categoria?
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
              Eliminar Categoria
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
