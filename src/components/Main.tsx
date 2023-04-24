import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMemo } from "react";
import { MainCard } from "./MainCard";
import { OfferCard } from "./OfferCard";

export function Main() {
  const theme = useTheme();
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const mainCard = useMemo(() => <MainCard />, []);

  return (
    <Grid
      container
      rowSpacing={{ xs: 2, sm: 3, md: 4 }}
      columnSpacing={{ sm: 2, md: 3 }}
    >
      {smallToMid ? mainCard : null}
      <OfferCard
        primary="#ced9dd"
        secondary="#dde5e9"
        transporter={1}
        workers={2}
      />
      {smallToMid ? null : mainCard}

      <OfferCard
        transporter={1}
        workers={3}
        primary="#cdd2cb"
        secondary="#dce0dd"
      />
      <OfferCard
        transporter={2}
        workers={3}
        primary="#b8c0c3"
        secondary="#cdd4d8"
      />
      <OfferCard
        transporter={2}
        workers={4}
        primary="#cecece"
        secondary="#DDDEDF"
      />
    </Grid>
  );
}
