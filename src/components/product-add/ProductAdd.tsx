import { Button, Dialog } from "@radix-ui/themes";
import { ProductForm } from "../product-form/ProductForm";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { NewProduct } from "../../types/product";

const NEW_PRODUCT: NewProduct = {
  name: "",
  description: "",
  price: 0,
  price_discount: null,
  availability: true,
  category: "cafeteria",
  imageUrl: "",
  isVegan: false,
  isVegetarian: false,
  isGlutenFree: false,
  isLactoseFree: false,
};

export const ProductAdd = () => {
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
        <Button>AGREGAR NUEVO PRODUCTO</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>AGREGAR PRODUCTO</Dialog.Title>
        <Dialog.Description>
          COMPLETA LOS DATOS DEL NUEVO PRODUCTO
        </Dialog.Description>
        <ProductForm product={NEW_PRODUCT} onSave={handleSave} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
