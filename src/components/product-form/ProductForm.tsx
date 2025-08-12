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
import { NewProduct } from "../../types/product";

type ProductFormProps = {
  onSave: (product: any) => void;
  product: NewProduct;
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

type DietKey = keyof NewProduct;

const DIET_TYPES: { key: DietKey; label: string }[] = [
  { key: "isVegan", label: "Vegano" },
  { key: "isVegetarian", label: "Vegetariano" },
  { key: "isGlutenFree", label: "Sin Gluten" },
  { key: "isLactoseFree", label: "Sin Lactosa" },
];

export const ProductForm = ({ onSave, product }: ProductFormProps) => {
  const [productData, setProductData] = useState(product);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setProductData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!productData.name || productData.name.trim() === "") {
      newErrors.name = "El nombre es obligatorio";
    }
    if (
      productData.price === undefined ||
      productData.price === null ||
      productData.price === 0 ||
      Number(productData.price) <= 0
    ) {
      newErrors.price = "El precio debe ser mayor a 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(productData);
  };

  return (
    <Flex direction="column" gap="4">
      <Text size="1" as="label">
        Nombre
        <TextField.Root
          value={productData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <Text size="1" style={{ color: "red" }}>
            {errors.name}
          </Text>
        )}
      </Text>

      <Text size="1" as="label">
        Descripción
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
            aria-invalid={!!errors.price}
          >
            <TextField.Slot>$</TextField.Slot>
          </TextField.Root>
          {errors.price && (
            <Text size="1" style={{ color: "red" }}>
              {errors.price}
            </Text>
          )}
        </Text>

        <Text size="1" as="label">
          Precio oferta
          <TextField.Root
            type="number"
            value={productData.price_discount ?? ""}
            onChange={(e) =>
              handleInputChange(
                "price_discount",
                e.target.value === "" ? null : e.target.value
              )
            }
          >
            <TextField.Slot>$</TextField.Slot>
          </TextField.Root>
        </Text>
      </Flex>

      <Text size="1" as="label">
        Categoría
        <Flex direction="column">
          <Select.Root
            size="1"
            defaultValue="cafeteria"
            value={productData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <Select.Trigger />
            <Select.Content>
              {PRODUCT_CATEGORY.map((category) => (
                <Select.Item key={category.value} value={category.value}>
                  {category.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      </Text>

      <Text size="1" as="label">
        Tipo de dieta
        <Flex direction="column" gap="1">
          {DIET_TYPES.map(({ key, label }) => (
            <Text size="1" as="label" key={key}>
              <Flex gap="2" align="center">
                <Checkbox
                  checked={
                    productData[key] === null
                      ? undefined
                      : Boolean(productData[key])
                  }
                  onCheckedChange={(checked) =>
                    handleInputChange(key, checked === true)
                  }
                />
                {label}
              </Flex>
            </Text>
          ))}
        </Flex>
      </Text>

      <Text size="1" as="label">
        <Switch
          checked={productData.availability}
          onCheckedChange={(value) => handleInputChange("availability", value)}
        />{" "}
        Disponible
      </Text>
      <Button onClick={handleSave}>GUARDAR</Button>
    </Flex>
  );
};
