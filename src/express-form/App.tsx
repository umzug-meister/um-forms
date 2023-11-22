import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import AppLoader from "../shared/AppLoader";
import { AppProgress } from "./components/AppProgress";
import { Inputs } from "../components/Inputs";
import { Main } from "../components/Main";
import { Success } from "../shared/routes/Success";
import { store } from "../store";
import { theme } from "../shared/theme";

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
                <Routes>
                  <Route index element={<Main />} />
                  <Route path="inputs" element={<Inputs />} />
                  <Route path="success/:id" element={<Success />} />
                </Routes>
              </div>
            </HashRouter>
          </ThemeProvider>
        </AppLoader>
      </Provider>
    </>
  );
}
