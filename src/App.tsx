import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLoader from "./AppLoader";
import { HeightOberserver } from "./components/HeightObserver";
import { Inputs } from "./components/Inputs";
import { Main } from "./components/Main";
import { store } from "./store";
import { theme } from "./theme";

export function App() {
  return (
    <>
      <Provider store={store}>
        <AppLoader>
          <ThemeProvider theme={theme}>
            <main className="content">
              <BrowserRouter>
                <Routes>
                  <Route index element={<Main />} />
                  <Route path="inputs" element={<Inputs />} />
                </Routes>
              </BrowserRouter>
            </main>
          </ThemeProvider>
          <HeightOberserver />
        </AppLoader>
      </Provider>
    </>
  );
}
