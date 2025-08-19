import { faCarrot, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Flex, Text } from "@radix-ui/themes";

export const DietType = () => {
  return (
    <Card>
      <Flex gap="4" align="center">
        <Flex direction="column" align="center">
          <FontAwesomeIcon color="green" icon={faLeaf} />
          <Text size="1">Vegano</Text>
        </Flex>
        <Flex direction="column" align="center">
          <FontAwesomeIcon color="orange" icon={faCarrot} />
          <Text size="1">Vegetariano</Text>
        </Flex>
        <Flex direction="column" align="center">
          <Text color="lime" size="2" weight="bold">
            GF
          </Text>
          <Text size="1" align="center">
            Gluten Free
          </Text>
        </Flex>
        <Flex direction="column" align="center">
          <Text color="sky" size="2" weight="bold">
            LF
          </Text>{" "}
          <Text size="1" align="center">
            Lactora Free
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
