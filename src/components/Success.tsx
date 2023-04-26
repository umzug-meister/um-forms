import { Box, Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { scrollToRoot } from "../main";
import { AppDispatch } from "../store";
import { clearState } from "../store/appReducer";

export function Success() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onOkClick = useCallback(() => {
    navigate("/");
    dispatch(clearState());
    scrollToRoot();
  }, []);

  return (
    <Box
      m="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minWidth="300px"
      minHeight="300px"
      gap={3}
      p={2}
      borderRadius="10px"
      sx={{ backgroundColor: "#d1c7be69" }}
    >
      <Box>
        <Typography variant="h2">Erfolgreich!</Typography>
      </Box>
      <Typography variant="h4">
        Ihre Anfrage-ID lautet: <strong>{`${params.id}`}</strong>
      </Typography>
      <Typography>
        Bitte diese ID bei Rückfragen bereithalten. Eine Bestätigungsmail ist
        bereits unterwegs.
      </Typography>
      <Box mt={6}>
        <Button onClick={onOkClick} variant="contained" color="primary">
          Alles Klar!
        </Button>
      </Box>
    </Box>
  );
}
