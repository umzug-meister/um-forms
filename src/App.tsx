import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import AppLoader from "./AppLoader";
import { Inputs } from "./components/Inputs";
import { Main } from "./components/Main";
import { Success } from "./components/Success";
import { store } from "./store";
import { theme } from "./theme";

export function App() {
  return (
    <>
      <Provider store={store}>
        <AppLoader>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <HashRouter>
              <div style={{ maxWidth: "1080px", margin: "auto" }}>
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
