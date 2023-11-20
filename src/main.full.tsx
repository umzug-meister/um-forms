import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const ROOT_NODE = "um-full-form-root";

export function scrollToRoot() {
  const elem = document.getElementById(ROOT_NODE);
  if (elem) {
    const top = elem.getBoundingClientRect().top + window.scrollY;

    window.scroll({ top, behavior: "smooth" });
  }
}

ReactDOM.createRoot(document.getElementById(ROOT_NODE) as HTMLElement).render(
  <React.StrictMode>
    <div>Hello full form</div>
  </React.StrictMode>
);
