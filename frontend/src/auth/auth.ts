import { PublicClientApplication, Configuration } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "cbb91110-13c6-428e-92e6-b89b6b984dc7",
    authority:
      "https://login.microsoftonline.com/69eaf322-247b-4276-925b-427c5af8d5c3",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
