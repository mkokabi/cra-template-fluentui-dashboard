import { IPublicClientApplication } from "@azure/msal-browser";
import { msalInstance } from "../index";
import { protectedResources } from "./authConfig";

async function getAccessToken(
  instance: IPublicClientApplication
): Promise<string> {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const request = {
    ...protectedResources.assetApi,
    account: account,
  };
  
  const response = await instance.acquireTokenSilent(request);
  return response.accessToken;
}

export const getAuthHeader = async (): Promise<Headers> => {
  const headers = new Headers();

  const accessToken = await getAccessToken(msalInstance);

  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  return headers;
};

// export const useIsAuthenticated = (): [boolean, (prevState: boolean) => boolean] => {
//   const isAuthenticatedInAad = useIsAuthenticatedMsal();
//   const [isAuthenticatedInDb, setIsAuthenticatedInDb] = useState(false);
//   const set = (x: boolean): boolean => {
//     setIsAuthenticatedInDb(x);
//     return x;
//   }
//   return [idp === idps.DB ? isAuthenticatedInDb : isAuthenticatedInAad, set];
// }
