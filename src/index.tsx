import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import DryEyeTheme from "./theme/theme";
import "./index.css";

const theme = extendTheme(DryEyeTheme);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
