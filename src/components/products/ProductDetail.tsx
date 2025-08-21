import {
  Text,
  Flex,
  Inset,
  Card,
  Button,
  Badge,
  Box,
  IconButton,
} from "@radix-ui/themes";
import { Product } from "../../types/product";
import { useState } from "react";
import { useCartStore } from "../../store/cart-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/blackLogo.svg";

type ProductDetailProps = {
  product: Product;
};

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { name, description, price, imageUrl, price_discount } = product;

  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const existingProduct = cartItems.find((item) => item.name === name);

  const [count, setCount] = useState(existingProduct?.quantity ?? 1);

  const handleAddCount = () => setCount((prev) => prev + 1);
  const handleSubCount = () => setCount((prev) => Math.max(1, prev - 1));

  const handleSubmit = () => {
    if (existingProduct) {
      updateItemQuantity(name, count);
    } else {
      addItem(product, count);
    }
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="2"
      width="100%"
    >
      {/* IMAGE */}
      <Inset side="top">
        <img
          style={{
            width: "100%",
            maxHeight: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
          src={imageUrl || Logo}
          alt={name}
        />
      </Inset>

      {/* NAME & DESCRIPTION & PRICE */}
      <Text weight="bold" size="4">
        {name}
      </Text>
      <Text weight="light" size="2">
        {description}
      </Text>

      {/* PRICE */}
      <Flex gap="2">
        {price_discount && (
          <Text color="green" weight="bold">
            ${price_discount}
          </Text>
        )}

        <Text
          className={price_discount ? "line-through text-gray-400" : ""}
          weight={price_discount ? "light" : "bold"}
        >
          ${price}
        </Text>
      </Flex>

      {/* UNITS */}
      <Box width="100%">
        <Card>
          <Flex px="3" justify="between" gap="8">
            <Text weight="bold">Unidades</Text>
            <Flex align="center" gap="4">
              <IconButton
                disabled={count < 2}
                size="1"
                variant="ghost"
                onClick={handleSubCount}
              >
                <FontAwesomeIcon icon={faMinus} />
              </IconButton>
              <Badge size="2">{count}</Badge>
              <IconButton size="1" variant="ghost" onClick={handleAddCount}>
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            </Flex>
          </Flex>
        </Card>
      </Box>

      {/* ADD OR MODIFY */}
      <Flex direction="column" width="100%">
        <Button
          onClick={handleSubmit}
          color={existingProduct ? "yellow" : "green"}
          radius="full"
          size="3"
        >
          <Flex justify="between" width="100%">
            <Badge variant="outline" highContrast>
              {count}
            </Badge>
            <Text>
              {existingProduct ? "Modificar pedido" : "Agregar a mi pedido"}
            </Text>
            <Text>
              ${price_discount ? price_discount * count : price * count}
            </Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};
