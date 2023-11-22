import {
  Box,
  Button,
  Card,
  CardActionArea,
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

export function Success() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const onOkClick = useCallback(() => {
    dispatch(clearState());
    window.location.href = "https://umzugruckzuck.de";
  }, []);

  return (
    // <Box
    //   m="auto"
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="center"
    //   alignItems="center"
    //   minWidth="300px"
    //   minHeight="300px"
    //   gap={3}
    //   p={2}
    //   borderRadius="10px"
    //   sx={{ backgroundColor: "#d1c7be69" }}
    // >
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
          <Button
            disableElevation
            onClick={onOkClick}
            variant="contained"
            color="primary"
          >
            Alles Klar!
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
