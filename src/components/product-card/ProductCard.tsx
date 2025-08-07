import {
  Card,
  Flex,
  Text,
  Avatar,
  Badge,
  Dialog,
  IconButton,
} from "@radix-ui/themes";
import { type Product } from "../../types/product";
import "./product-card.css";
import { ProductDetail } from "../product-detail/ProductDetail";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, price, price_discount, imageUrl } = product;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card style={{ boxShadow: "var(--shadow-3)" }}>
          <Flex
            width="320px"
            height="120px"
            justify={"between"}
            gap={"1"}
            align={"center"}
          >
            <Flex direction="column" gap={"2"}>
              {/* BADGES */}
              <Flex gap={"1"}>
                {/* TODO */}
                <Badge color="green">15% Off</Badge>
                <Badge> NEW </Badge>
                {/* TODO */}
              </Flex>

              {/* NAME & DESCRIPTION */}
              <Flex direction={"column"}>
                <Text size="3" weight={"bold"}>
                  {name}
                </Text>
                <Text
                  className="line-clamp-2 overflow-hidden text-ellipsis"
                  weight="light"
                  size="2"
                >
                  {description}
                </Text>
              </Flex>

              {/* PRICE */}
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

            {/* IMAGE */}
            <Avatar size="7" src={imageUrl} fallback="" />
          </Flex>
        </Card>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex direction={"column"} align={"center"} gap={"6"}>
          <ProductDetail product={product} />
          <Dialog.Close>
            <IconButton size={"1"} radius="full" color="red">
              <FontAwesomeIcon size="xs" icon={faXmark} />
            </IconButton>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
