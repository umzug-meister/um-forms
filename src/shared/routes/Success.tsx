import { Alert, Box, Card, CardActions, CardContent } from "@mui/material";
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
    <Card elevation={0}>
      <CardContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <Alert>Anfrage erfolgreich versendet!</Alert>
          <Alert severity="info">
            Ihre Anfrage-ID lautet: <strong>{`${params.id}`}</strong>
            <p>
              Bei Rückfragen, bitte diese ID bereithalten. Eine Bestätigungsmail
              ist bereits unterwegs.
            </p>
          </Alert>
        </Box>
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
  );
}
