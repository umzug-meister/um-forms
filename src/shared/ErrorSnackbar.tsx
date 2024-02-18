import { Alert, Box } from "@mui/material";

interface Props {
  message: string;
  open: boolean;
}

export function ErrorSnackbar({ message, open }: Props) {
  return (
    <Box sx={{ minHeight: 64 }}>
      {open && <Alert severity="error">{message}</Alert>}
    </Box>
  );
}
