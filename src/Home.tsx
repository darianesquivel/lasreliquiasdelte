import { Flex, Heading } from "@radix-ui/themes";
import logo from "./assets/logo.svg";
import { ProductCard } from "./components/product-card/product-card";
import { EXTRAS, PRODUCTS_A, PRODUCTS_B } from "./data/products";

function Home() {
  return (
    <Flex className="flex flex-col items-center justify-center gap-4">
      <img src={logo} alt="logo" className="w-[200px]" />
      <Heading size="5">MENÚ</Heading>

      <Heading size="3">ACCIO CAFÉ</Heading>
      <Flex justify="center" wrap="wrap" className="gap-4">
        {PRODUCTS_A.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Flex>

      <Heading size="3">ADICIONALES</Heading>
      <Flex justify="center" wrap="wrap" className="gap-4">
        {EXTRAS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Flex>

      <Heading size="3">BLEND DOLORES UMBRIDGE (TETERA X 500 ML)</Heading>
      <Flex justify="center" wrap="wrap" className="gap-4">
        {PRODUCTS_B.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Flex>
    </Flex>
  );
}

export default Home;
