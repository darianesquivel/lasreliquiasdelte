import { Flex, Heading, Text } from "@radix-ui/themes";
import { ProductCard } from "../../components/products/ProductCard";
import { useGetProduct } from "../../hooks/useGetProducts";
import { Cart } from "../../components/cart/Cart";
import { ThemeButton } from "../../components/theme/ThemeButton";
import { Logo } from "../../components/logo/Logo";

const categoryOrder = [
  "ofertas",
  "cafeteria",
  "te",
  "pudineria",
  "panaderia",
  "salado",
  "adicionales",
  "jugos",
  "otro",
];

const Menu = () => {
  const { isError, isLoading, data } = useGetProduct();

  const productsByCategory = data?.reduce((acc, product) => {
    if (product.price_discount) {
      if (!acc["ofertas"]) {
        acc["ofertas"] = [];
      }
      acc["ofertas"].push(product);
    }

    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);

    return acc;
  }, {} as Record<string, typeof data>);

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

        {data && data.length < 1 && <Text>No tiene productos</Text>}
        {isLoading && <Text>Loading ...</Text>}
        {isError && <Text>Error</Text>}

        {productsByCategory &&
          categoryOrder.map((category) => {
            const products = productsByCategory[category];
            if (!products) return null;

            return (
              <Flex
                key={category}
                direction="column"
                gap="3"
                className="w-full"
              >
                <Heading size="4">{category.toUpperCase()}</Heading>
                <Flex justify="start" wrap="wrap" gap="4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
};

export default Menu;
