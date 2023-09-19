export const msalConfig = {
  auth: {
    clientId: `${process.env.REACT_APP_PORTAL_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  assetApi: {
    assetsEndpoint: `${process.env.REACT_APP_BACKEND_API_URL}/asset`,
    scopes: [`${process.env.REACT_APP_SCOPES}`],
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// // Add the endpoints here for Microsoft Graph API services you'd like to use.
// export const graphConfig = {
//   graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
// };

export const appRoles = {
  Admin: `${process.env.REACT_APP_ADMIN_ROLE}`,
  Viewer: `${process.env.REACT_APP_VIEWER_ROLE}`,
};

