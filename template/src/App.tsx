import { FC, useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Routes from "./Routes";
import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { PrimaryButton } from "@fluentui/react";
import { appRoles, loginRequest } from "./services/authConfig";
import { getProfileData } from "./services/graph";
import { IProfileData } from "./atoms/authAtoms";
import { useSetAtom } from "jotai";
import { errorMessageAtom } from "./atoms/messageBarAtoms";
import { EventType } from "@azure/msal-browser";
import { BrowserRouter } from "react-router-dom";

const App: FC<any> = ({ instance }) => {
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const [showAuthSpinner, setShowAuthSpinner] = useState(false);

  const isAuthenticatedInAad = useIsAuthenticated();

  const { accounts } = useMsal();
  const account = useAccount();

  useEffect(() => {
    const fetchAuth = async () => {
      setShowAuthSpinner(true);
      try {
        await instance.initialize();
        instance.addEventCallback((event: any) => {
          if (event.eventType === EventType.LOGIN_SUCCESS) {
            const accounts = instance.getAllAccounts();
            instance.setActiveAccount(accounts[0]);
            const currentAccount: any = instance.getActiveAccount();

            if (currentAccount && currentAccount.idTokenClaims["roles"]) {
              let intersection = [appRoles.Admin, appRoles.Viewer].filter(
                (role: any) =>
                  currentAccount.idTokenClaims["roles"].includes(role)
              );

              if (intersection.length > 0) {
                setIsAuthorized(true);
              }
            }
          }
        });
        if (instance.getAllAccounts().length > 0) {
          const profileData: IProfileData = await getProfileData(
            instance,
            accounts
          );
          const username = account?.username;
          profileData.userPrincipalName = username ?? "";
          console.log("profileData", profileData);
        }
      } catch (error: any) {
        console.error("Error:", error);
        setErrorMessage(
          "Fail at authentication. Please try again later and if problem persisted contact support."
        );
      } finally {
        setShowAuthSpinner(false);
      }
      return () => {};
    };

    fetchAuth();
  }, [
    accounts,
    instance,
    setErrorMessage,
    // setIsInProgress,
    // setProfileData,
  ]);

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

  return (
    <div>
      {showAuthSpinner ? (
        <div className="App">
          <p>Authenticating...</p>
        </div>
      ) : isAuthenticatedInAad ? (
        isAuthorized ? (
          <BrowserRouter basename="/">
            <Layout onSignOut={handleSignOut}>
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
