import { Outlet } from "react-router-dom";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [curStep, setCurStep] = useState(0);

  const routes = ["/", "auszug", "einzug", "extras", "absenden"];
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes[curStep]);
  }, [navigate, curStep]);

  const next = (step: number) => {
    setCurStep((curStep) => step + curStep);
  };

  return (
    <Box
      p={1}
      display="flex"
      flexDirection="column"
      gap={3}
      alignItems="center"
    >
      <Stepper activeStep={curStep}>
        {["Kontakt", "Auszug", "Einzug", "Extras", "Fertig"].map(
          (stepLabel) => (
            <Step key={stepLabel}>
              <StepLabel>{stepLabel}</StepLabel>
            </Step>
          )
        )}
      </Stepper>
      <Outlet></Outlet>
      <Box display="flex" gap={3}>
        <Button
          disabled={curStep === 0}
          variant="outlined"
          onClick={() => next(-1)}
        >
          zurück
        </Button>
        <Button
          disabled={curStep === routes.length - 1}
          variant="contained"
          onClick={() => next(1)}
        >
          weiter
        </Button>
      </Box>
    </Box>
  );
}
