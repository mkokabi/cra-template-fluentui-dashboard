import { FC } from "react";
import "./App.css";
import Layout from "./components/Layout";

const App: FC<any> = ({ instance }) => {
  return (
    <div>
      <Layout />
    </div>
  );
};

export default App;
