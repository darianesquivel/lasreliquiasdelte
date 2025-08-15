import { Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { ProductCard } from "../../components/products/ProductCard";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { Cart } from "../../components/cart/Cart";
import { ThemeButton } from "../../components/theme/ThemeButton";
import { Logo } from "../../components/logo/Logo";

const Menu = () => {
  const { isError, isLoading, data: products } = useGetProducts();

  return (
    <Flex direction="column" align="center">
      <Flex
        direction="column"
        align="center"
        overflow="auto"
        justify="center"
        gap="2"
      >
        <ThemeButton />
        <Logo />
        <Cart />
        <Heading size="5">MENÚ</Heading>

        {products && products.length < 1 && <Text>No tiene productos</Text>}

        {isLoading && (
          <Flex>
            <Spinner size="3" />
          </Flex>
        )}

        {isError && <Text>Error</Text>}

        {products &&
          products.map((product) => {
            return (
              <Flex justify="center" wrap="wrap" gap="2">
                <ProductCard key={product.id} product={product} />
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
};

export default Menu;
