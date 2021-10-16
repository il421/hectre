import "./normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

import App from "./App";
import { Colours } from "./common/variables";
import { Provider as AuthorizationContext } from "./contexts/AuthorizationContext";
import { Provider as ChemicalsContext } from "./contexts/ChemicalsContext";
import { Provider as HarvestContext } from "./contexts/HarvestContext";

const theme = createTheme({
  palette: {
    primary: {
      main: Colours.base
    },
    secondary: {
      main: Colours.naturalDark
    }
  }
});
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthorizationContext>
        <ChemicalsContext>
          <HarvestContext>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </HarvestContext>
        </ChemicalsContext>
      </AuthorizationContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
