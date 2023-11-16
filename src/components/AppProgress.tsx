import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function AppProgress() {
  const { pathname } = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveStep(0);
        break;
      case "/inputs":
        setActiveStep(1);
        break;
      default:
        setActiveStep(2);
        break;
    }
  }, [pathname]);

  return (
    <Box p={2}>
      <Stepper activeStep={activeStep}>
        {["Angebot auswählen", "Kontakt hinterlegen", "Fertig"].map(
          (stepLabel) => (
            <Step key={stepLabel}>
              <StepLabel>{stepLabel}</StepLabel>
            </Step>
          )
        )}
      </Stepper>
    </Box>
  );
}
