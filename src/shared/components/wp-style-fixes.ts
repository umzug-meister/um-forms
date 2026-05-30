export function getButtonColors(variant: "text" | "outlined" | "contained") {
  const bgColor = variant === "outlined" ? "transparent" : "primary.main";
  const color = variant === "outlined" ? "primary.main" : "#fff";
  const hoverBGColor = variant === "outlined" ? "grey.100" : "primary.dark";

  return { bgColor, color, hoverBGColor };
}
