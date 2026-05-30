import { Button, ButtonProps, useTheme } from "@mui/material";
import React from "react";
import { getButtonColors } from "./wp-style-fixes";

export function AppButton(props: React.PropsWithChildren<ButtonProps>) {
  const theme = useTheme();
  const buttonColors = getButtonColors(props.variant || "text", theme);

  console.log(buttonColors);

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
