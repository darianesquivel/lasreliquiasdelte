import { Box, Card, Flex, Text, Avatar } from "@radix-ui/themes";
import { type Product } from "../../types/product";
import "./product-card.css";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, price, price_discount, imageUrl } = product;

  return (
    <Box width="350px" height="130px" position="relative">
      <Card>
        <Flex justify={"between"}>
          <Flex>
            <Flex>
              <Flex direction="column">
                <Text size="3">{name}</Text>
                <Text weight="light" size="1">
                  {description}
                </Text>
              </Flex>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <Text size="2" weight="bold">
                ${price_discount ?? price}
              </Text>
              {price_discount ? (
                <Text className="text-through" size="1" weight="medium">
                  ${price}
                </Text>
              ) : null}
            </Flex>
          </Flex>
          <Flex>
            <Avatar size="7" src={imageUrl} fallback="" />
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};
