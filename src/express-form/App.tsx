import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppLoader from "../shared/AppLoader";
import { ColFlexBox } from "../shared/components/ColFlexBox";
import { rootSX } from "../shared/constants";
import { theme } from "../shared/theme";
import { store } from "../store";
import AppRoutesEx from "./components/app-routes-ex";
import { AppProgress } from "./components/AppProgress";

export function App() {
  return (
    <>
      <Provider store={store}>
        <AppLoader>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <HashRouter>
              <ColFlexBox sx={rootSX}>
                <AppProgress />
                <AppRoutesEx />
              </ColFlexBox>
            </HashRouter>
          </ThemeProvider>
        </AppLoader>
      </Provider>
    </>
  );
}
