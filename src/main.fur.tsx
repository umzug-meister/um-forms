import React from "react";
import ReactDOM from "react-dom/client";
import App from "./fur-form/App";

import "./index.css";

const ROOT_NODE = "um-fur-form-root";

ReactDOM.createRoot(document.getElementById(ROOT_NODE) as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
