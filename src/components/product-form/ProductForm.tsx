import {
  Button,
  Text,
  TextField,
  TextArea,
  Flex,
  Switch,
  Select,
  Checkbox,
} from "@radix-ui/themes";
import { useState } from "react";

type ProductFormProps = {
  onSave: (product: any) => void;
  product: any;
};

export const PRODUCT_CATEGORY = [
  { value: "cafeteria", label: "Cafetería" },
  { value: "te", label: "Té" },
  { value: "pudineria", label: "Pudinería" },
  { value: "salado", label: "Salado" },
  { value: "adicionales", label: "Adicionales" },
  { value: "jugos-batidos", label: "Jugos y Batidos" },
  { value: "postres", label: "Postres" },
  { value: "otro", label: "Otro" },
];

export const ProductForm = ({ onSave, product }: ProductFormProps) => {
  const [productData, setProductData] = useState(product);

  const handleInputChange = (field: any, value: any) => {
    setProductData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Flex direction="column" gap="4">
      <Text size="1" as="label">
        Nombre
        <TextField.Root
          value={productData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </Text>

      <Text size="1" as="label">
        Descripcion
        <TextArea
          value={productData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </Text>

      <Flex gap="4">
        <Text size="1" as="label">
          Precio
          <TextField.Root
            type="number"
            value={productData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          >
            <TextField.Slot>$</TextField.Slot>
          </TextField.Root>
        </Text>

        <Text size="1" as="label">
          Precio oferta
          <TextField.Root
            type="number"
            value={productData.price_discount}
            onChange={(e) =>
              handleInputChange("price_discount", e.target.value)
            }
          >
            <TextField.Slot>$</TextField.Slot>
          </TextField.Root>
        </Text>
      </Flex>

      <Text size="1" as="label">
        Categoria
        <Flex direction="column">
          <Select.Root
            size="1"
            value={productData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <Select.Trigger />
            <Select.Content>
              {PRODUCT_CATEGORY.map((type) => (
                <Select.Item value={type.value}>{type.label}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      </Text>

      <Text size="1" as="label">
        Tipo de dieta
        <Flex direction="column" gap="1">
          <Text size="1" as="label">
            <Flex gap="2">
              <Checkbox
                checked={productData.isVegan}
                onCheckedChange={(checked) =>
                  handleInputChange("isVegan", checked)
                }
              />
              Vegano
            </Flex>
          </Text>
          <Text size="1" as="label">
            <Flex gap="2">
              <Checkbox
                checked={productData.isVegetarian}
                onCheckedChange={(checked) =>
                  handleInputChange("isVegetarian", checked)
                }
              />
              Vegetariano
            </Flex>
          </Text>
          <Text size="1" as="label">
            <Flex gap="2">
              <Checkbox
                checked={productData.isGlutenFree}
                onCheckedChange={(checked) =>
                  handleInputChange("isGlutenFree", checked)
                }
              />
              Sin Gluten
            </Flex>
          </Text>
          <Text size="1" as="label">
            <Flex gap="2">
              <Checkbox
                checked={productData.isLactoseFree}
                onCheckedChange={(checked) =>
                  handleInputChange("isLactoseFree", checked)
                }
              />
              Sin Lactosa
            </Flex>
          </Text>
        </Flex>
      </Text>

      <Text size="1" as="label">
        <Switch
          checked={productData.availability}
          onCheckedChange={(value) => handleInputChange("availability", value)}
        />{" "}
        Disponible
      </Text>
      <Button onClick={() => onSave(productData)}>GUARDAR</Button>
    </Flex>
  );
};
