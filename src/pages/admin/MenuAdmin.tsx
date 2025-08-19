import { Badge, Card, Flex, Tabs, Text, TextField } from "@radix-ui/themes";
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
import { ThemeButton } from "../../components/theme/ThemeButton";
import { ProductCard } from "../../components/products/ProductCard";

function MenuAdmin() {
  const { data: products } = useGetProducts();
  const { data: categories } = useGetCategories();

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <Flex direction={"column"} gap={"2"} width="100%">
      <ThemeButton />
      <Tabs.Root defaultValue="products">
        <Tabs.List color="orange">
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
              return (
                <Flex gap="2" align="center">
                  <ProductCard key={product.id} product={product} />
                  <Flex direction="column" gap="4">
                    <EditProduct product={product} />
                    <DeleteProduct id={product.id} />
                  </Flex>
                </Flex>
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

            <Flex direction="column" gap="4" maxWidth="300px">
              {categories?.map((category) => {
                return (
                  <Flex gap="2" align="center">
                    <Card>
                      <Flex
                        key={category.id}
                        align="center"
                        justify="between"
                        gap="4"
                        width={"300px"}
                        height={"30px"}
                      >
                        <Badge color={category.color}>{category.name}</Badge>
                        <Flex gap="2"></Flex>
                      </Flex>
                    </Card>
                    <Flex direction="column" gap="1">
                      <DeleteCategory id={category.id} />
                      <EditCategory category={category} />
                    </Flex>
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
