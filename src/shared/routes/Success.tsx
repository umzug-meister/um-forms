import { Alert, Card, CardActions, CardContent } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch } from "../../store";
import { clearState } from "../../store/appReducer";
import { AppButton } from "../components/AppButton";
import { ColFlexBox } from "../components/ColFlexBox";
import { useOption } from "../hooks";

export default function Success() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const homeUrl = useOption("homeUrl");

  const onOkClick = useCallback(() => {
    dispatch(clearState());
    window.location.href = homeUrl;
  }, []);

  return (
    <Card elevation={0}>
      <CardContent>
        <ColFlexBox gap={1}>
          <Alert>Anfrage erfolgreich versendet!</Alert>
          <Alert severity="info">
            Ihre Anfrage-ID lautet: <strong>{`${params.id}`}</strong>
            <p>
              Bei Rückfragen, bitte diese ID bereithalten. Eine Bestätigungsmail
              ist bereits unterwegs.
            </p>
          </Alert>
        </ColFlexBox>
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
