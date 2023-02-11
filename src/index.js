import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./App.css";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("app");
ReactDOM.createRoot(rootElement).render(
  <HashRouter>
    <App />
  </HashRouter>
);
