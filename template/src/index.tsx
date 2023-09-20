import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeIcons } from "@fluentui/react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./services/authConfig";
import { MsalProvider } from "@azure/msal-react";

export const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

initializeIcons();

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App instance={msalInstance} />
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
