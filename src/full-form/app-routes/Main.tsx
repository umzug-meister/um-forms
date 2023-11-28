import {
  Alert,
  AlertColor,
  Box,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ButtonProps } from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { scrollToRoot } from "../../main.full";
import {
  ValidationError,
  ValidationErrorType,
} from "../../shared/classes/ValidationError";
import { AppButton } from "../../shared/components/AppButton";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import { useValidate } from "../../shared/hooks/useValidate";

const routes = [
  { label: "Kontakt", route: "/" },
  { route: "auszug", label: "Auszug" },
  { route: "einzug", label: "Einzug" },
  { route: "verpackung", label: "Verpackung" },
  { route: "absenden", label: "Fertig" },
];

export default function Main() {
  const severity = useRef<AlertColor>("error");
  const alertMessage = useRef("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const narrowScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { validate } = useValidate();

  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes[activeStep].route);
  }, [navigate, activeStep]);

  const next = (step: number) => {
    try {
      if (validate(activeStep)) {
        setActiveStep((curStep) => step + curStep);
        scrollToRoot();
      }
    } catch (e: any) {
      alertMessage.current = e.toString();
      setOpenSnackbar(true);
    }
  };

  const nextButtonProps: ButtonProps = {
    variant: "contained",
    onClick: () => next(1),
    disableElevation: true,
    size: "large",
  };

  const lastStep = activeStep === routes.length - 1;

  const backButtonProps: ButtonProps = {
    variant: "outlined",
    onClick: () => next(-1),
    disabled: activeStep === 0,
    size: "large",
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={severity.current}>{alertMessage.current}</Alert>
      </Snackbar>
      <ColFlexBox gap={4} alignItems="center">
        <Stepper activeStep={activeStep}>
          {routes.map((route) => (
            <Step key={route.label}>
              <StepLabel>{narrowScreen ? null : route.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Outlet />

        <Box display="flex" gap={4} paddingBottom={5}>
          <AppButton {...backButtonProps}>zurück</AppButton>
          {lastStep ? null : <AppButton {...nextButtonProps}>weiter</AppButton>}
        </Box>
      </ColFlexBox>
    </>
  );
}
