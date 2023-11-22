import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch } from "../../store";
import { clearState } from "../../store/appReducer";
import { AppButton } from "../components/AppButton";

export default function Success() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const onOkClick = useCallback(() => {
    dispatch(clearState());
    window.location.href = "https://umzugruckzuck.de";
  }, []);

  return (
    <Box>
      <Card variant="outlined" sx={{ backgroundColor: "#d1c7be69" }}>
        <CardHeader
          title={
            <Typography align="center" variant="h4">
              Anfrage erfolgreich versendet!
            </Typography>
          }
        />
        <CardContent>
          <Typography align="center" variant="h6">
            Ihre Anfrage-ID lautet: <strong>{`${params.id}`}</strong>
          </Typography>
          <Typography align="center">
            Bitte diese ID bei Rückfragen bereithalten. Eine Bestätigungsmail
            ist bereits unterwegs.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <AppButton
            disableElevation
            onClick={onOkClick}
            variant="contained"
            color="primary"
          >
            Alles Klar!
          </AppButton>
        </CardActions>
      </Card>
    </Box>
  );
}
