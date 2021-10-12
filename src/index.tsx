import "./normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Provider as ChemicalsContext } from "./contexts/ChemicalsContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChemicalsContext>
        <App />
      </ChemicalsContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
