import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { deDE } from "@mui/x-date-pickers/locales";

const opts: ThemeOptions = {
  palette: {
    primary: {
      main: "#1774BF",
    },
  },

  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#1a1a1a",
          fontWeight: "400",
        },
      },
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: `"Montserrat","Arial", sans-serif`,
    fontSize: 14,
    fontWeightRegular: 400,
  },
};

export const theme = createTheme(opts, deDE);
