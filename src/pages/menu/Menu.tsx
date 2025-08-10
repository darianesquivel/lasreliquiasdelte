import { Flex, Heading, Text } from "@radix-ui/themes";
import logo from "../../assets/logo.svg";
import { ProductCard } from "../../components/product-card/ProductCard";
import { useGetProduct } from "../../hooks/useGetProducts";
import { Cart } from "../../components/cart/Cart";

const Menu = () => {
  const { isError, isLoading, data } = useGetProduct();

  console.log("DATA => ", data);

  return (
    <Flex direction={"column"} align={"center"}>
      <Flex
        direction={"column"}
        align={"center"}
        overflow={"auto"}
        justify={"center"}
        gap={"2"}
      >
        <Cart />
        <img src={logo} alt="logo" className="w-[200px]" />
        <Heading size="5">MENÚ</Heading>
        <Heading size="3">ACCIO CAFÉ</Heading>
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
