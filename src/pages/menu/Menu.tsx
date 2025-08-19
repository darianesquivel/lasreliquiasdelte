import { Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { ProductCard } from "../../components/products/ProductCard";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { Cart } from "../../components/cart/Cart";
import { ThemeButton } from "../../components/theme/ThemeButton";
import { Logo } from "../../components/logo/Logo";
import { DietType } from "../../components/products/DietTypes";
import { NoProducts } from "../../components/products/NoProducts";

const Menu = () => {
  const { isError, isLoading, data: products } = useGetProducts();

  return (
    <Flex direction="column" align="center" width="100%">
      <Flex
        direction="column"
        align="center"
        overflow="auto"
        justify="center"
        gap="2"
        width="100%"
      >
        <Flex width="100%" justify="between" align="start">
          <ThemeButton />
          <Logo />
          <Cart />
        </Flex>

        <Heading size="5">MENÚ</Heading>

        <DietType />

        {products && products.length < 1 && <NoProducts />}

        {isLoading && (
          <Flex>
            <Spinner size="3" />
          </Flex>
        )}

        {isError && <Text>Error</Text>}

        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </Flex>
    </Flex>
  );
};

export default Menu;
