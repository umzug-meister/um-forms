import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const optiosn: ThemeOptions = {
  palette: {
    primary: {
      main: "#1ca76e",
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: `"Open Sans", Helvetica, Arial, Lucida, sans-serif`,
    fontSize: 14,
    fontWeightRegular: 300,
  },
};

export const theme = createTheme(optiosn);
