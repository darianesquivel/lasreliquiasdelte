import Menu from "./pages/menu/Menu";
import MenuAdmin from "./pages/admin/MenuAdmin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Menu} /> ;
      <Route path="/admin" Component={MenuAdmin} />
    </Routes>
  );
}

export default App;
