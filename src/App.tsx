import { useGoogleSheet } from "./hooks/useGoogleSheet";
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import logo from "./assets/logo.svg";

function App() {
  const { data, loading, error } = useGoogleSheet();
  const background =
    "https://img.freepik.com/free-photo/cardboard-sheet-paper-abstract-texture-background_7182-2105.jpg?size=626&ext=jpg";

  console.log(data);
  return (
    <Flex
      className=" flex flex-col items-center justify-center h-screen gap-4 overflow-auto"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img src={logo} alt="logo" />
      <Heading as="h1">MENÚ</Heading>
      {data.map((item) => {
        if (item.type === "title") {
          return (
            <Flex
              className="flex flex-col items-center justify-center w-full"
              key={item.id}
            >
              <Separator size="4" />
              <Heading as="h2" size="5">
                {item.name}
              </Heading>
              <Separator size="4" />
            </Flex>
          );
        }

        if (item.type === "subtitle") {
          return (
            <Heading as="h3" size="4" key={item.id} className="border p-2">
              {item.name}
            </Heading>
          );
        }

        if (item.type === "product") {
          return (
            <Text key={item.id}>
              {item.name} - ${item.price}
            </Text>
          );
        }
      })}
    </Flex>
  );
}

export default App;
