import { Flex, Heading, Text } from "@radix-ui/themes";
import { ProductCard } from "../../components/products/ProductCard";
import { useGetProduct } from "../../hooks/useGetProducts";
import { Cart } from "../../components/cart/Cart";
import { ThemeButton } from "../../components/theme/ThemeButton";
import { Logo } from "../../components/logo/Logo";

const Menu = () => {
  const { isError, isLoading, data } = useGetProduct();

  return (
    <Flex direction={"column"} align={"center"}>
      <Flex
        direction={"column"}
        align={"center"}
        overflow={"auto"}
        justify={"center"}
        gap={"2"}
      >
        <ThemeButton />
        <Logo />
        <Cart />
        <Heading size="5">MENÚ</Heading>
        {data && data.length < 1 && <Text>No tiene productos</Text>}
        {isLoading && <Text>Loading ...</Text>}
        {isError && <Text>Error</Text>}

        {data && (
          <Flex justify="center" wrap="wrap" className="gap-4">
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Menu;
