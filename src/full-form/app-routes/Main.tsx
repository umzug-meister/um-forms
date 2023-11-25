import {
  Box,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ButtonProps } from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { scrollToRoot } from "../../main.full";
import { AppButton } from "../../shared/components/AppButton";

const routes = [
  { label: "Kontakt", route: "/" },
  { route: "auszug", label: "Auszug" },
  { route: "einzug", label: "Einzug" },
  { route: "verpackung", label: "Verpackung" },
  { route: "absenden", label: "Fertig" },
];

export default function Main() {
  const theme = useTheme();
  const narrowScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeStep, setActiveStep] = useState(4);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes[activeStep].route);
  }, [navigate, activeStep]);

  const next = (step: number) => {
    setActiveStep((curStep) => step + curStep);
    scrollToRoot();
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
    <Box display="flex" flexDirection="column" gap={4} alignItems="center">
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
    </Box>
  );
}
