import { BoxProps, Box } from "@mui/material";
import React from "react";

export function ColFlexBox(props: Readonly<React.PropsWithChildren<BoxProps>>) {
  return (
    <Box display="flex" flexDirection="column" gap={2} {...props}>
      {props.children}
    </Box>
  );
}
