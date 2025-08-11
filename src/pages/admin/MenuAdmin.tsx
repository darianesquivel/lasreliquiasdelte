import { Avatar, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useGetProduct } from "../../hooks/useGetProducts";
import { ProductEdit } from "../../components/product-edit/ProductEdit";
import { ProductDetelete } from "../../components/product-delete/ProductDelete";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebonce";
import { ProductAdd } from "../../components/product-add/ProductAdd";

function MenuAdmin() {
  const { data } = useGetProduct();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredProducts = data?.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  console.log("DATA =>", data);

  return (
    <Flex direction={"column"} gap={"2"} px={"5"}>
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
        const {
          id,
          name,
          description,
          price,
          availability,
          category,
          price_discount,
        } = product;

        return (
          <Card key={id}>
            <Flex gap="2" align="center" justify="between" p="2">
              <Flex gap="2" align="center">
                <Avatar size="6" fallback />
                <Flex direction="column" maxWidth="500px">
                  <Text
                    className="line-clamp-1 overflow-hidden text-ellipsis"
                    size="4"
                    weight="bold"
                  >
                    {name}
                  </Text>
                  <Text
                    truncate
                    className="line-clamp-2 overflow-hidden text-ellipsis"
                    size="3"
                    weight="light"
                  >
                    {description}
                  </Text>

                  <Text>Precio: $ {price}</Text>
                  {price_discount && (
                    <Text>Precio oferta: $ {price_discount}</Text>
                  )}

                  <Text>Disponible: {availability ? "Si" : "No"}</Text>
                  <Text>Categoria: {category}</Text>
                </Flex>
              </Flex>
              <Flex gap="4">
                <ProductEdit product={product} />
                <ProductDetelete id={id} />
              </Flex>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
}

export default MenuAdmin;
