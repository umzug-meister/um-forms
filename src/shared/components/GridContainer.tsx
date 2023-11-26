import { GridProps, Grid } from "@mui/material";
import React from "react";

export function GridContainer(
  props: React.PropsWithChildren<Readonly<GridProps>>
) {
  return (
    <Grid container spacing={2} {...props}>
      {props.children}
    </Grid>
  );
}
