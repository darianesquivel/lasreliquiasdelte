import { Flex, Heading, Text } from "@radix-ui/themes";
import logo from "./assets/logo.svg";
import { ProductCard } from "./components/product-card/product-card";
import { useGetProduct } from "./hooks/useGetProducts";

const Menu = () => {
  const { isError, isLoading, data } = useGetProduct();

  return (
    <Flex direction={"column"} align={"center"} width={"100%"}>
      <Flex
        direction={"column"}
        align={"center"}
        overflow={"auto"}
        justify={"center"}
      >
        <img src={logo} alt="logo" className="w-[200px]" />
        <Heading size="5">MENÚ</Heading>
        <Heading size="3">ACCIO CAFÉ</Heading>

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
