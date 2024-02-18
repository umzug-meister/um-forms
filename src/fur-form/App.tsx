import { Typography } from "@mui/material";
import { useRef, useState } from "react";
import { CustomerData } from "../shared/components/CustomerData";
import { DataPrivacyCheck } from "../shared/components/DataPrivacyCheck";
import FurnitureCalculator from "../shared/components/FurnitureCalculator";
import ImageUploader from "../shared/components/ImageUploader";
import { ErrorSnackbar } from "../shared/ErrorSnackbar";
import { MainApp } from "../shared/MainApp";
import { SendButton } from "../shared/SendButton";

export default function App() {
  const alertMessage = useRef("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onValidation = (message: string, valid: boolean) => {
    console.log(message, valid);
    if (!valid) {
      alertMessage.current = message;
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 4000);
    }
  };

  return (
    <MainApp>
      <FurnitureCalculator />
      <Typography variant="h5">
        Sie können die Möbelliste direkt an uns senden.
      </Typography>
      <CustomerData />
      <ImageUploader />
      <DataPrivacyCheck />
      <SendButton
        src="Moebelliste"
        shouldValidateCustomer
        onValidation={onValidation}
      />
      <ErrorSnackbar open={openSnackbar} message={alertMessage.current} />
    </MainApp>
  );
}
