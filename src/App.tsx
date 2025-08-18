import Menu from "./pages/menu/Menu";
import MenuAdmin from "./pages/admin/MenuAdmin";
import { Routes, Route } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

function App() {
  return (
    <Flex p="5" width="100%" height="100%" justify="center">
      <Routes>
        <Route path="/" Component={Menu} /> ;
        <Route path="/admin" Component={MenuAdmin} />
      </Routes>
    </Flex>
  );
}

export default App;
