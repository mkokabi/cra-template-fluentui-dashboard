import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { graphConfig, loginRequest } from "./authConfig";
import { IProfileData } from "../atoms/authAtoms";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export async function callMsGraph(accessToken: any) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function getProfileData(
  instance: IPublicClientApplication,
  accounts: AccountInfo[]
): Promise<IProfileData> {
  const request = {
    ...loginRequest,
    account: accounts[0],
  };
  const response = await instance.acquireTokenSilent(request);
  const claims: any = response?.account?.idTokenClaims;
  const roles: string[] = claims?.roles;
  const data = await callMsGraph(response.accessToken);

  return {
    givenName: data.givenName,
    surname: data.surname,
    userPrincipalName: data.userPrincipalName,
    email: data.email,
    id: data.id,
    roles: roles,
    permissions: [],
  };
}