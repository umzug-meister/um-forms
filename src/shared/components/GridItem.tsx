import { GridProps, Grid } from "@mui/material";
import React from "react";

export function GridItem(props: React.PropsWithChildren<Readonly<GridProps>>) {
  return (
    <Grid item xs={12} {...props}>
      {props.children}
    </Grid>
  );
}
