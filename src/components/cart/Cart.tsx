import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faTrashAlt,
  faMinus,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useCartStore } from "../../store/cart-store";

export const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const handleSendOrder = () => {
    const items = useCartStore.getState().items;

    const message = `Hola! Quiero hacer este pedido:\n\n${items
      .map(
        (item) =>
          `${item.name} x${item.quantity} - $${
            (item.price_discount ?? item.price) * item.quantity
          }`
      )
      .join("\n")}\n\nTotal: $${totalPrice}`;

    const phoneNumber = "5491121547438";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <Box className="absolute" right={"5"} top={"5"}>
      <Dialog.Root>
        <Dialog.Trigger>
          <Flex position={"relative"}>
            <IconButton variant="soft">
              <FontAwesomeIcon icon={faCartShopping} />
            </IconButton>
            {totalQuantity > 0 && (
              <Badge variant="solid" radius="full" color="red">
                {totalQuantity}
              </Badge>
            )}
          </Flex>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>TU CARRITO</Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <Flex direction={"column"} align={"center"} gap={"3"}>
            <FontAwesomeIcon icon={faCartShopping} />
            <Flex direction={"column"} gap={"2"}>
              {items.length > 0 &&
                items.map((item) => {
                  return (
                    <Flex key={item.id} gap={"4"} align={"center"}>
                      <Avatar fallback src={item.imageUrl} />
                      <Text size={"1"}>{item.name}</Text>
                      <Text size={"1"}>x{item.quantity}</Text>
                      <Flex gap={"2"}>
                        <IconButton
                          size={"2"}
                          variant="ghost"
                          onClick={() => removeItem(item.name)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </IconButton>
                        <IconButton
                          size={"2"}
                          variant="ghost"
                          onClick={() => incrementItem(item.name)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </IconButton>

                        <IconButton
                          onClick={() => removeProduct(item.name)}
                          size={"1"}
                          variant="ghost"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </IconButton>
                      </Flex>
                    </Flex>
                  );
                })}
            </Flex>
            {!items.length && <Text>No tienes productos</Text>}
            {totalPrice > 0 && (
              <Text weight={"bold"}>Total: ${totalPrice}</Text>
            )}
            {items.length > 0 && (
              <Flex direction={"column"} gap={"2"}>
                <Button radius="full" color="red" onClick={clearCart}>
                  Eliminar carrito <FontAwesomeIcon icon={faTrashAlt} />
                </Button>

                <Button radius="full" color="green" onClick={handleSendOrder}>
                  Enviar pedido <FontAwesomeIcon icon={faWhatsapp} />
                </Button>
              </Flex>
            )}
            <Dialog.Close>
              <IconButton size={"1"} radius="full" color="red">
                <FontAwesomeIcon size="xs" icon={faXmark} />
              </IconButton>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};
