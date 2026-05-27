import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { theme } from "../theme";

export function AppButton(props: React.PropsWithChildren<ButtonProps>) {
  const bgColor =
    props.variant === "outlined" ? "transparent" : theme.palette.primary.main;
  return (
    <Button
      size="large"
      {...props}
      sx={{
        ...props.sx,
        "&:focus": {
          backgroundColor: `${bgColor}!important`,
        },
      }}
    >
      {props.children}
    </Button>
  );
}
