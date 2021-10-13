import "./normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Provider as AuthorizationContext } from "./contexts/AuthorizationContext";
import { Provider as ChemicalsContext } from "./contexts/ChemicalsContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthorizationContext>
        <ChemicalsContext>
          <App />
        </ChemicalsContext>
      </AuthorizationContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
