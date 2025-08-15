import { Dialog, IconButton } from "@radix-ui/themes";
import { CategoryForm } from "./CategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Category, NewCategory } from "../../types/categories";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";
import { useGetProducts } from "../../hooks/products/useGetProducts";

type EditCategoryProps = {
  category: Category;
};

export const EditCategory = ({ category }: EditCategoryProps) => {
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { data: products } = useGetProducts();

  const handleSave = async (updatedCategory: Category) => {
    const productsToUpdate = products?.filter(
      (product) => product?.category?.id === updatedCategory.id
    );

    if (productsToUpdate?.length) {
      await Promise.all(
        productsToUpdate.map((product) =>
          updateProduct({
            ...product,
            category: updatedCategory,
          })
        )
      );
    }
    await updateCategory(updatedCategory);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton size={"1"} radius="full">
          <FontAwesomeIcon size="xs" icon={faEdit} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>EDITAR CATEGORIA</Dialog.Title>
        <Dialog.Description>EDITA LA CATEGORIA</Dialog.Description>
        <CategoryForm
          category={category}
          onSave={(values: NewCategory) =>
            handleSave({
              ...values,
              id: category.id,
              createdAt: category.createdAt,
            })
          }
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};
