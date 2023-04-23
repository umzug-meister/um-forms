import { useMemo } from "react";

import {
  Box,
  Button,
  Card,
  Checkbox,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface Props {
  transporter?: number;
  workers?: number;
  primary: string;
  secondary: string;
}

export function OfferCard({ transporter, workers, primary, secondary }: Props) {
  const imageSrc = useMemo(
    () => `src/assets/${workers}_${transporter}.png`,
    [transporter, workers]
  );
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{ backgroundColor: primary, height: "100%" }}
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <Box
          sx={{
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: secondary,
          }}
        >
          <img src={imageSrc} height={50} />
        </Box>
        <Box sx={{ background: "white", height: "4px" }} />
        <Box paddingX={2} paddingY={3}>
          <Button variant="contained">Weiter</Button>
          <br />
          <br />
          <TextField size="small"></TextField>
          <Radio size="small"></Radio>
        </Box>
      </Box>
    </Grid>
  );
}
