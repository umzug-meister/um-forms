import { TextField, TextFieldProps } from "@mui/material";

export function AppTextField(props: TextFieldProps) {
  return (
    <TextField
      sx={
        props.size === "small"
          ? {
              "& input[type=text]": {
                border: "none !important",
                padding: "10px!important",
              },
              "& input[type=email]": {
                border: "none !important",
                padding: "10px!important",
              },
              "& input[type=number]": {
                border: "none !important",
                padding: "10px!important",
                appearance: "textfield",
                MozAppearance: "textfield",
                WebkitAppearance: "textfield",
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                display: "none",
              },
            }
          : {
              "& input[type=text]": {
                border: "none !important",
                padding: "16px!important",
              },
              "& input[type=email]": {
                border: "none !important",
                padding: "16px!important",
              },
              "& input[type=number]": {
                border: "none !important",
                padding: "16px!important",
                appearance: "textfield",
                MozAppearance: "textfield",
                WebkitAppearance: "textfield",
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                display: "none",
              },
            }
      }
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}
