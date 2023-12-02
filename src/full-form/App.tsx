import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppLoader from "../shared/AppLoader";
import { ColFlexBox } from "../shared/components/ColFlexBox";
import { rootSX } from "../shared/ruckzuckStyle";
import { theme } from "../shared/theme";
import { store } from "../store";
import { AppRoutes } from "./app-routes";

export default function App() {
  return (
    <Provider store={store}>
      <AppLoader full>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <HashRouter>
            <ColFlexBox sx={rootSX}>
              <AppRoutes />
            </ColFlexBox>
          </HashRouter>
        </ThemeProvider>
      </AppLoader>
    </Provider>
  );
}
