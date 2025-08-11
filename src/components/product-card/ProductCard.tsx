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
import { ProductDetail } from "../product-detail/ProductDetail";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "@firebase/firestore";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, price, price_discount, imageUrl, createdAt } =
    product;

  const percentDiscount = price_discount
    ? Math.round(((price - price_discount) / price) * 100)
    : null;

  function isNew(createdAt?: Timestamp): boolean {
    if (!createdAt) return false; // si no existe, no es nuevo

    const createdDate = createdAt.toDate(); // convertir de Timestamp a Date
    const now = new Date();

    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays <= 10;
  }

  const isNewProduct = isNew(createdAt);

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
              {/* TAGS */}
              <Flex gap={"1"}>
                {percentDiscount && (
                  <Badge color="green">{percentDiscount}% Off </Badge>
                )}

                {isNewProduct && <Badge color="blue"> New </Badge>}
              </Flex>

              {/* NAME & DESCRIPTION */}
              <Flex direction={"column"}>
                <Text
                  className="line-clamp-1 overflow-hidden text-ellipsis"
                  size="3"
                  weight={"bold"}
                >
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
                <Text weight={"bold"}>
                  $ {price_discount ? price_discount : price}
                </Text>
                {price_discount && (
                  <Text className="line-through">$ {price}</Text>
                )}
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
