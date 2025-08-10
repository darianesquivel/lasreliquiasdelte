import {
  Flex,
  TextArea,
  TextField,
  Switch,
  Button,
  AlertDialog,
  Dialog,
  IconButton,
} from "@radix-ui/themes";
import { type Product } from "../../types/product";
import { useState, useMemo } from "react";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";

type ProductEditProps = {
  product: Product;
};

export const ProductEdit = ({ product }: ProductEditProps) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [originalProduct, setOriginalProduct] = useState<Product>(product);

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const handleInputChange = (field: keyof Product, value: any) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    updateProduct(editedProduct, {
      onSuccess: () => {
        setOriginalProduct(editedProduct);
      },
    });
  };

  const hasChanges = useMemo(() => {
    return JSON.stringify(originalProduct) !== JSON.stringify(editedProduct);
  }, [originalProduct, editedProduct]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton radius="full" size={"1"} color="green">
          <FontAwesomeIcon size="xs" icon={faEdit} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>EDITAR PRODUCTO</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          HAS CAMBIOS A TUS PRODUCTOS
        </Dialog.Description>
        <Flex direction={"column"} gap={"3"}>
          <TextField.Root
            value={editedProduct.name ?? ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <TextArea
            value={editedProduct.description ?? ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <TextField.Root
            type="number"
            value={editedProduct.price ?? 0}
            onChange={(e) => handleInputChange("price", Number(e.target.value))}
          />

          <TextField.Root
            type="number"
            value={editedProduct.price_discount ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange(
                "price_discount",
                value === "" ? null : Number(value)
              );
            }}
          />

          <Switch
            checked={editedProduct.availability ?? false}
            onCheckedChange={(value) =>
              handleInputChange("availability", value)
            }
          />

          <Flex gap={"2"}>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button
                  loading={isPending}
                  color="green"
                  disabled={!hasChanges}
                >
                  Guardar
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>GUARDAR CAMBIOS</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Estas seguro que queres guardar los cambios?
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="solid" color="red">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="green" onClick={handleSave}>
                      Guardar
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Flex>

        <Dialog.Close>
          <IconButton size={"1"} radius="full" color="red">
            <FontAwesomeIcon size="xs" icon={faXmark} />
          </IconButton>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};
