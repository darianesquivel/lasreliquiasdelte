import {
  Card,
  Flex,
  Text,
  Avatar,
  Badge,
  Dialog,
  IconButton,
  VisuallyHidden,
  Box,
} from "@radix-ui/themes";
import { type Product } from "../../types/product";
import { ProductDetail } from "./ProductDetail";
import { faCarrot, faLeaf, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "@firebase/firestore";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    name,
    description,
    price,
    price_discount,
    imageUrl,
    category,
    createdAt,
    isGlutenFree,
    isLactoseFree,
    isVegan,
    isVegetarian,
  } = product;

  const percentDiscount = price_discount
    ? Math.round(((price - price_discount) / price) * 100)
    : null;

  function isNew(createdAt?: Timestamp): boolean {
    if (!createdAt) return false;

    const createdDate = createdAt.toDate();
    const now = new Date();

    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays <= 10;
  }

  const isNewProduct = isNew(createdAt);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Box width={{ initial: "100%", md: "600px" }}>
          <Card>
            <Flex gap="4" align="center" justify="between">
              <Flex gap="2">
                {/* IMAGE */}
                <Avatar size="7" fallback src={imageUrl} radius="small" />

                {/* NAME - DESCRIPTION - PRICE - PRICE DISCOUNT */}
                <Flex direction="column" gap="1">
                  {category && (
                    <Badge
                      className="max-w-min"
                      color={category.color}
                      size="1"
                    >
                      {category.name}
                    </Badge>
                  )}

                  <Text
                    className="line-clamp-1 text-ellipsis"
                    size="2"
                    weight="bold"
                  >
                    {name}
                  </Text>
                  <Text
                    className="line-clamp-2  text-ellipsis"
                    size="1"
                    weight="light"
                  >
                    {description}
                  </Text>

                  <Flex gap="2">
                    {price_discount && (
                      <Text color="green" weight="bold" size="1">
                        ${price_discount}
                      </Text>
                    )}

                    <Text
                      className={
                        price_discount ? "line-through text-gray-400" : ""
                      }
                      weight={price_discount ? "light" : "bold"}
                      size="1"
                    >
                      ${price}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              {/* TAGS */}
              <Flex gap="2" direction="column" align="end">
                {isNewProduct && (
                  <Badge className="max-w-min" color="mint">
                    New
                  </Badge>
                )}

                {percentDiscount && (
                  <Badge color="orange">{percentDiscount}% OFF</Badge>
                )}

                <Flex direction="column" gap="1">
                  <Flex justify="end" gap="1">
                    {isVegetarian && (
                      <FontAwesomeIcon color="orange" icon={faCarrot} />
                    )}

                    {isVegan && <FontAwesomeIcon color="green" icon={faLeaf} />}
                  </Flex>
                  <Flex justify="end" gap="2">
                    {isGlutenFree && (
                      <Text color="lime" size="2" weight="bold">
                        GF
                      </Text>
                    )}

                    {isLactoseFree && (
                      <Text color="sky" size="2" weight="bold">
                        LF
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Dialog.Trigger>
      <Dialog.Content aria-describedby={undefined}>
        <Dialog.Title>
          <VisuallyHidden asChild>Product detail</VisuallyHidden>
        </Dialog.Title>

        <Flex direction="column" align="center" gap="6">
          <ProductDetail product={product} />
          <Dialog.Close>
            <IconButton size="1" radius="full" color="red">
              <FontAwesomeIcon size="xs" icon={faXmark} />
            </IconButton>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
