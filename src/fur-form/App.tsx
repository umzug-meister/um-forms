import {
  Alert,
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Provider } from "react-redux";
import AppLoader from "../shared/AppLoader";
import { ColFlexBox } from "../shared/components/ColFlexBox";
import { CustomerData } from "../shared/components/CustomerData";
import { DataPrivacyCheck } from "../shared/components/DataPrivacyCheck";
import FurnitureCalculator from "../shared/components/FurnitureCalculator";
import ImageUploader from "../shared/components/ImageUploader";
import { rootSX } from "../shared/constants";
import { useValidate } from "../shared/hooks/useValidate";
import { SendButton } from "../shared/SendButton";
import { theme } from "../shared/theme";
import { store } from "../store";

export default function App() {
  return (
    <Provider store={store}>
      <AppLoader full>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <ReduxApp />
        </ThemeProvider>
      </AppLoader>
    </Provider>
  );
}

const ReduxApp = () => {
  const { validate } = useValidate();
  const alertMessage = useRef("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validateFn = () => {
    try {
      return validate("moebelliste");
    } catch (e: any) {
      alertMessage.current = e.toString();
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 5000);
      return false;
    }
  };

  return (
    <ColFlexBox sx={rootSX} gap={8}>
      <FurnitureCalculator />
      <Typography variant="h5">
        Sie können die Möbelliste direkt an uns senden.
      </Typography>
      <CustomerData />
      <ImageUploader />
      <DataPrivacyCheck />
      <SendButton src="Moebelliste" />
      <Box sx={{ minHeight: 64 }}>
        {openSnackbar && <Alert severity="error">{alertMessage.current}</Alert>}
      </Box>
    </ColFlexBox>
  );
};
