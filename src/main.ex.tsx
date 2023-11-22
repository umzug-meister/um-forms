import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./express-form/App";
import "./index.css";
import { scrollToElement } from "./shared/utils";

const ROOT_NODE = "um-express-form-root";

console.log(ROOT_NODE);

ReactDOM.createRoot(document.getElementById(ROOT_NODE) as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const scrollToRoot = () => {
  scrollToElement(ROOT_NODE);
};
