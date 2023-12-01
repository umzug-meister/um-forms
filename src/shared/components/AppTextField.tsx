import { TextField, TextFieldProps } from "@mui/material";

export function AppTextField(props: TextFieldProps) {
  const cssProps = (size: number) => {
    return {
      "& input[type=text]": {
        border: "none !important",
        padding: `${size}px!important`,
      },
      "& input[type=email]": {
        border: "none !important",
        padding: `${size}px!important`,
      },
      "& input[type=number]": {
        border: "none !important",
        padding: `${size}px!important`,
        appearance: "textfield",
        MozAppearance: "textfield",
        WebkitAppearance: "textfield",
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        display: "none",
      },
    };
  };

  return (
    <TextField
      sx={props.size === "small" ? cssProps(10) : cssProps(16)}
      fullWidth
      variant="outlined"
      {...props}
      inputProps={{
        "data-hj-allow": "",
        ...props.inputProps,
      }}
    />
  );
}
