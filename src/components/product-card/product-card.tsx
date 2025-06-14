import { Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import "./product-card.css";

interface ProductCardProps {
  product: {
    name: string;
    description: string;
    price: number;
    availability: boolean;
  };
}
export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box width="300px" height="100px" position="relative">
      <Card className="h-full w-full">
        <Flex justify="between" align="center" content="center" gap="2">
          <Flex direction="column">
            <Text size="3">{product.name}</Text>
            <Text weight="light" size="1">
              {product.description}
            </Text>
          </Flex>
          <Text size="2" weight="bold">
            ${product.price}
          </Text>
        </Flex>
      </Card>

      {!product.availability && (
        <Badge
          size="3"
          color="red"
          className="absolute top-10 right-25 -rotate-10"
          radius="full"
          variant="outline"
        >
          No disponible
        </Badge>
      )}
    </Box>
  );
};
