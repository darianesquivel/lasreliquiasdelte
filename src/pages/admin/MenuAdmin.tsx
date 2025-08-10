import { Flex, Text, TextField } from "@radix-ui/themes";
import { useGetProduct } from "../../hooks/useGetProducts";
import { ProductEdit } from "../../components/product-edit/ProductEdit";
import { ProductDetelete } from "../../components/product-delete/ProductDelete";
import { ProductAdd } from "../../components/product-add/ProductAdd";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebonce";

function MenuAdmin() {
  const { data } = useGetProduct();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredProducts = data?.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <Flex direction={"column"} gap={"2"}>
      <Text>ADMINISTRAR PRODUCTOS</Text>
      <Flex gap="2">
        <TextField.Root
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ProductAdd />
      </Flex>

      {filteredProducts?.map((product) => {
        const { id, name, description, price, availability } = product;

        return (
          <Flex key={id} gap={"2"} align={"center"}>
            <Text>{name}</Text>
            <Text>{description}</Text>
            <Text>$ {price}</Text>
            <Text>{availability ? "Disponible" : "No disponible"}</Text>
            <ProductEdit product={product} />
            <ProductDetelete id={id} />
          </Flex>
        );
      })}
    </Flex>
  );
}

export default MenuAdmin;
