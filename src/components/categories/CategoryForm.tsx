import { Button, Flex, TextField, Select, Badge, Text } from "@radix-ui/themes";
import { useState } from "react";
import type { BadgeProps } from "@radix-ui/themes";
import { NewCategory } from "../../types/categories";

type CategoryColor = BadgeProps["color"];

const COLORS: CategoryColor[] = [
  "gray",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
];

interface CategoryFormProps {
  onSave: (category: NewCategory) => void;
  category?: NewCategory;
}

const NEW_CATEGORY: NewCategory = {
  name: "",
  color: "gray",
};

export const CategoryForm = ({ onSave, category }: CategoryFormProps) => {
  const [NewCategory, setNewCategory] = useState<NewCategory>(
    category || NEW_CATEGORY
  );

  const handleSave = () => {
    onSave(NewCategory);
  };

  return (
    <Flex direction="column" gap="4">
      <Text size="1" as="label">
        Nombre
        <TextField.Root
          value={NewCategory.name}
          onChange={(e) =>
            setNewCategory({ ...NewCategory, name: e.target.value })
          }
          placeholder="Nombre de la categoría"
        />
      </Text>

      <Text size="1" as="label">
        Color
        <Select.Root
          value={NewCategory.color}
          onValueChange={(color) =>
            setNewCategory({ ...NewCategory, color: color as CategoryColor })
          }
        >
          <Select.Trigger>{NewCategory.color}</Select.Trigger>
          <Select.Content>
            {COLORS.map((color) => (
              <Select.Item key={color} value={color as string}>
                <Badge color={color} size="3">
                  {color}
                </Badge>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Text>

      <Button onClick={handleSave}>GUARDAR</Button>
    </Flex>
  );
};
