import { Button, ButtonProps } from "@mui/material";
import React, { useMemo } from "react";
import { theme } from "../theme";

export function AppButton(props: React.PropsWithChildren<ButtonProps>) {
  const buttonColors = useMemo(
    () => ({
      bgColor:
        props.variant === "outlined"
          ? "transparent"
          : theme.palette.primary.main,
      color: props.variant === "outlined" ? theme.palette.primary.main : "#fff",
      hoverBGColor:
        props.variant === "outlined"
          ? theme.palette.grey[100]
          : theme.palette.primary.dark,
    }),
    [props.variant]
  );

  return (
    <Button
      size="large"
      {...props}
      sx={{
        ...props.sx,
        "&:focus": {
          color: `${buttonColors.color}!important`,
          backgroundColor: `${buttonColors.bgColor}!important`,
        },
        "&:hover": {
          color: `${buttonColors.color}!important`,
          backgroundColor: `${buttonColors.hoverBGColor}!important`,
        },
      }}
    >
      {props.children}
    </Button>
  );
}
