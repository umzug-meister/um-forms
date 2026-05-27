import { Typography } from "@mui/material";
import { lazy, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CustomerData } from "../shared/components/CustomerData";
import { DataPrivacyCheck } from "../shared/components/DataPrivacyCheck";
import FurnitureCalculator from "../shared/components/FurnitureCalculator";
import ImageUploader from "../shared/components/ImageUploader";
import { LazyLoad } from "../shared/components/LazyLoad";
import SuccessPage from "../shared/components/SuccessPage";
import { ErrorSnackbar } from "../shared/ErrorSnackbar";
import { SendButton } from "../shared/SendButton";

function FurForm() {
  const alertMessage = useRef("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onValidation = (message: string, valid: boolean) => {
    if (!valid) {
      alertMessage.current = message;
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 4000);
    }
  };

  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route index element={<FurForm />} />
      <Route
        path="erfolg"
        element={
          <LazyLoad>
            <SuccessPage />
          </LazyLoad>
        }
      />
    </Routes>
  );
}
