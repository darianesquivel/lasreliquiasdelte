import {
  Flex,
  Text,
  TextArea,
  TextField,
  Switch,
  Button,
  AlertDialog,
  Dialog,
  IconButton,
  Select,
} from "@radix-ui/themes";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { NewProduct } from "../../types/product";
import { useCreateProduct } from "../../hooks/useCreateProduct";

const EMPTY_PRODUCT: NewProduct = {
  name: "",
  description: "",
  price: 0,
  price_discount: null,
  availability: true,
  imageUrl: "",
  type: "cafe",
};

const PRODUCT_TYPES = [
  { value: "cafe", label: "Cafetería" },
  { value: "adicionales", label: "Adicionales" },
  { value: "te", label: "Té" },
  { value: "pudineria", label: "Pudinera" },
  { value: "salado", label: "Salado" },
  { value: "otro", label: "Otro" },
];

export const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState<NewProduct>(EMPTY_PRODUCT);

  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleInputChange = (field: any, value: any) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log("newProduct", newProduct);

  const handleSave = () => {
    createProduct(newProduct, {
      onSuccess: () => {
        // setOriginalProduct(newProduct);
      },
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="green">Agregar Producto</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>CREAR PRODUCTO</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          CREA UN NUEVO PRODUCTO
        </Dialog.Description>
        <Flex direction={"column"} gap={"3"}>
          <Text size={"1"} as="label">
            Nombre
            <TextField.Root
              value={newProduct.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Text>

          <Text size={"1"} as="label">
            Descripcion
            <TextArea
              value={newProduct.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Text>

          <Flex gap={"4"}>
            <Text size={"1"} as="label">
              Precio
              <TextField.Root
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  handleInputChange("price", Number(e.target.value))
                }
              />
            </Text>

            <Text size={"1"} as="label">
              Precio con descuento
              <TextField.Root
                type="number"
                value={newProduct.price_discount ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange(
                    "price_discount",
                    value === "" ? null : Number(value)
                  );
                }}
              />
            </Text>
          </Flex>

          <Text size={"1"} as="label">
            Seccion
            <Flex direction={"column"}>
              <Select.Root
                size="1"
                value={newProduct.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <Select.Trigger />
                <Select.Content>
                  {PRODUCT_TYPES.map((type) => (
                    <Select.Item value={type.value}>{type.label}</Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          </Text>

          <Text size={"1"} as="label">
            Disponibilidad
            <Flex direction={"column"} gap={"1"}>
              <Switch
                checked={newProduct.availability}
                onCheckedChange={(value) =>
                  handleInputChange("availability", value)
                }
              />
            </Flex>
          </Text>

          <Flex gap={"2"}>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button
                  loading={isPending}
                  color="green"
                  // disabled={!hasChanges}
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
