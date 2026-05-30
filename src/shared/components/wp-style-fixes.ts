import { Theme } from "@mui/material";

export function getButtonColors(
  variant: "text" | "outlined" | "contained",
  theme: Theme
) {
  const bgColor =
    variant === "outlined" ? "transparent" : theme.palette.primary.main;
  const color = variant === "outlined" ? theme.palette.primary.main : "#fff";
  const hoverBGColor =
    variant === "outlined"
      ? theme.palette.grey[100]
      : theme.palette.primary.dark;

  return { bgColor, color, hoverBGColor };
}
