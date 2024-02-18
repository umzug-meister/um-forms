import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "../store";
import AppLoader from "./AppLoader";
import { ColFlexBox } from "./components/ColFlexBox";
import { theme } from "./theme";

interface Props {
  full?: true;
}

export function MainApp({ full, children }: React.PropsWithChildren<Props>) {
  return (
    <Provider store={store}>
      <AppLoader full={full}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <HashRouter>
            <ColFlexBox
              sx={{
                padding: 2,
                margin: "auto",
                maxWidth: "900px",
              }}
            >
              {children}
            </ColFlexBox>
          </HashRouter>
        </ThemeProvider>
      </AppLoader>
    </Provider>
  );
}
