import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export function End({ children }: PropsWithChildren) {
  return (
    <Typography color={"primary"} variant="subtitle2">
      {children}
    </Typography>
  );
}
