import { Button, ThemeProvider } from "@mui/material";
import "./App.css";
import { Main } from "./routes/Main";
import { theme } from "./theme";

export function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  );
}
