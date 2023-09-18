import { Route, Routes as ReactRoutes } from "react-router-dom";
import ItemsList from "./components/ItemsList";
import Home from "./components/Home";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<ItemsList />} />
    </ReactRoutes>
  );
};

export default Routes;
