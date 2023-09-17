import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ItemsList from "./components/ItemsList";
import Home from "./components/Home";

const App: FC<any> = ({ instance }) => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemsList />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
