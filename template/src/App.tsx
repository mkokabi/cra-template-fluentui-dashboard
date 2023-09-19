import { FC, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Routes from "./Routes";
import { useIsAuthenticated } from "@azure/msal-react";
import { PrimaryButton } from "@fluentui/react";
import { appRoles, loginRequest } from "./services/authConfig";

const App: FC<any> = ({ instance }) => {
  const isAuthenticatedInAad = useIsAuthenticated();

  const handleSignIn = () => {
    instance.loginRedirect(loginRequest).catch((e: any) => {
      console.error(e);
    });
  };

  const handleSignOut = () => {
    instance.logoutRedirect().catch((e: any) => {
      console.error(e);
    });
  };

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      const currentAccount: any = instance.getActiveAccount();

      if (currentAccount && currentAccount.idTokenClaims["roles"]) {
        let intersection = [appRoles.Admin, appRoles.Viewer].filter(
          (role: any) => currentAccount.idTokenClaims["roles"].includes(role)
        );

        if (intersection.length > 0) {
          setIsAuthorized(true);
        }
      }
    };
    onLoad();
  }, [instance]);

  return (
    <div>
      {isAuthenticatedInAad ? (
        isAuthorized ? (
          <BrowserRouter basename="/">
            <Layout>
              <Routes />
            </Layout>
          </BrowserRouter>
        ) : (
          <div className="App">
            <p>
              Your account is not permitted to use this application. Contact
              administrator or try another account.
            </p>
            <PrimaryButton onClick={handleSignOut}>Sign out</PrimaryButton>
          </div>
        )
      ) : (
        <div className="App">
          <p>You are not signed in! Please sign in.</p>
          <PrimaryButton onClick={() => handleSignIn()}>
            Organization Sign In
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default App;
