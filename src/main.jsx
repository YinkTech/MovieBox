import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import "./assets/css/style.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { SwitchRouter } from "./SwitchRouter.jsx";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <SwitchRouter />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
