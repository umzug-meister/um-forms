import { Button, ButtonProps } from "@mui/material";
import React from "react";

export function AppButton(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <Button size="large" disableElevation {...props}>
      {props.children}
    </Button>
  );
}
