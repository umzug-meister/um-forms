import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { theme } from "../shared/theme";
import AppLoader from "../shared/AppLoader";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./app-routes";

export default function App() {
  return (
    <Provider store={store}>
      <AppLoader full>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <HashRouter>
            <div
              style={{
                maxWidth: "1080px",
                margin: "auto",
              }}
            >
              <AppRoutes />
            </div>
          </HashRouter>
        </ThemeProvider>
      </AppLoader>
    </Provider>
  );
}
