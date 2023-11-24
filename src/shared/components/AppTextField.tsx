import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export function AppTextField(props: TextFieldProps) {
  return (
    <TextField
      sx={{
        "& input[type=text]": {
          border: "none !important",
          padding: "16px!important",
        },
        "& input[type=email]": {
          border: "none !important",
          padding: "16px!important",
        },
      }}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}
