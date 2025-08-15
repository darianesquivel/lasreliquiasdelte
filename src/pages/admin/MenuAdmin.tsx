import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { useGetCategories } from "../../hooks/categories/useGetCategories";
import { EditProduct } from "../../components/products/EditProduct";
import { DeleteProduct } from "../../components/products/DeleteProduct";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebonce";
import { CreateProduct } from "../../components/products/CreateProduct";
import { CreateCategory } from "../../components/categories/CreateCategory";
import { DeleteCategory } from "../../components/categories/DeleteCategory";
import { EditCategory } from "../../components/categories/EditCategory";

function MenuAdmin() {
  const { data: products } = useGetProducts();
  const { data: categories } = useGetCategories();

  console.log("PRODUCTS ==>", products);

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <Flex direction={"column"} gap={"2"} px={"5"}>
      <Tabs.Root defaultValue="products">
        <Tabs.List>
          <Tabs.Trigger value="products">Productos</Tabs.Trigger>
          <Tabs.Trigger value="categories">Categorias</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="products">
          <Flex direction="column" gap="4" p="4">
            <Text weight="bold">ADMINISTRAR PRODUCTOS</Text>
            <Flex gap="2">
              <TextField.Root
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CreateProduct />
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
                        <Text>
                          Categoria:
                          <Badge color={category?.color}>
                            {category?.name}
                          </Badge>
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex gap="4">
                      <EditProduct product={product} />
                      <DeleteProduct id={id} />
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="categories">
          <Flex direction="column" gap="4" p="4">
            <Text weight="bold">ADMINISTRAR CATEGORIAS</Text>
            <Flex>
              <CreateCategory />
            </Flex>

            <Flex direction="column">
              {categories?.map((category) => {
                return (
                  <Flex align="center">
                    <Badge color={category.color}>{category.name}</Badge>
                    <DeleteCategory id={category.id} />
                    <EditCategory category={category} />
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default MenuAdmin;
