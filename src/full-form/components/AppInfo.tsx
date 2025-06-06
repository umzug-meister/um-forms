import { Alert, Typography } from "@mui/material";
import React from "react";

interface Props {
  text: React.ReactNode;
}
export function AppInfo({ text }: Readonly<Props>) {
  return (
    <Alert severity="warning" icon={false}>
      <Typography variant="subtitle1">{text}</Typography>
    </Alert>
  );
}
