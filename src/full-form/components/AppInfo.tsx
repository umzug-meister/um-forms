import { Alert, Typography } from "@mui/material";
import React from "react";

interface Props {
  text: React.ReactNode;
}
export function AppInfo({ text }: Readonly<Props>) {
  return (
    <Alert severity="info" icon={false}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bolder" }}>
        {text}
      </Typography>
    </Alert>
  );
}
