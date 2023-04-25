import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const optiosn: ThemeOptions = {
  palette: {
    primary: {
      main: "#1ca76e",
    },
  },
  typography: {
    fontFamily: `"Open Sans", Helvetica, Arial, Lucida, sans-serif`,
    fontSize: 14,
    fontWeightRegular: 300,

    h1: {
      fontFamily: ["'Merieweather'", "serif"].join(","),
      fontSize: 30,
      color: "#333",
      fontWeight: 500,
    },
    h2: {
      fontFamily: ["'Merieweather'", "serif"].join(","),
      fontSize: 26,
      color: "#333",
      fontWeight: 500,
    },
    h3: {
      fontFamily: ["'Merieweather'", "serif"].join(","),
      fontSize: 22,
      color: "#333",
      fontWeight: 500,
    },
    h4: {
      fontFamily: ["'Merieweather'", "serif"].join(","),
      fontSize: 18,
      color: "#333",
      fontWeight: 500,
    },
    h5: {
      fontFamily: ["'Merriweather'", "serif"].join(","),
      fontSize: 16,
      color: "#333",
      fontWeight: 500,
    },
    h6: {
      fontFamily: ["'Merriweather'", "serif"].join(","),
      fontSize: 14,
      color: "#333",
      fontWeight: 500,
    },
  },
};

export const theme = createTheme(optiosn);
