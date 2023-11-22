import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppLoader from "../shared/AppLoader";
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
              <div style={{ maxWidth: "1080px", margin: "auto" }}>
                <AppProgress />
                <AppRoutesEx />
              </div>
            </HashRouter>
          </ThemeProvider>
        </AppLoader>
      </Provider>
    </>
  );
}
