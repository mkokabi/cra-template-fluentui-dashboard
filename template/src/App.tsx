import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Routes from "./Routes";


const App: FC<any> = ({ instance }) => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
