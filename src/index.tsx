import React from "react";
import ReactDOM from "react-dom";
import { Amplify } from "aws-amplify";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import config from "./configuration/aws";
import App from "./App";
import DryEyeTheme from "./theme/theme";
import "./index.css";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "admin",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

const theme = extendTheme(DryEyeTheme);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
