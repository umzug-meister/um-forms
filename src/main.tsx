import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

export const ROOT_NODE = "um-express-form-root";

ReactDOM.createRoot(document.getElementById(ROOT_NODE) as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
