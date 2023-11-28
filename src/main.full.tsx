import React from "react";
import ReactDOM from "react-dom/client";
import App from "./full-form/App";

import "./index.css";
import { scrollToElement } from "./shared/utils";

const ROOT_NODE = "um-full-form-root";

export function scrollToRoot() {
  return scrollToElement(ROOT_NODE);
}
ReactDOM.createRoot(document.getElementById(ROOT_NODE) as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
