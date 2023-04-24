import { Box, Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Success() {
  const params = useParams();

  const navigate = useNavigate();

  const onOkClick = useCallback(() => {
    navigate("/");
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
      borderRadius="10px"
      sx={{ backgroundColor: "#d1c7be69" }}
    >
      <Box>
        <Typography variant="h2">Erfolgreich!</Typography>
      </Box>
      <Box>
        <Typography variant="h4">
          Ihre Anfrage-ID lautet: <strong>{`${params.id}`}</strong>
        </Typography>
      </Box>
      <Box mt={6}>
        <Button onClick={onOkClick} variant="contained" color="primary">
          Alles Klar!
        </Button>
      </Box>
    </Box>
  );
}
