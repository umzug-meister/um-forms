import { Typography } from "@mui/material";
import OrderField from "./OrderField";
import { useOption } from "../hooks/useOption";

export function DataPrivacyCheck() {
  const url = useOption("dataPrivacyUrl");

  return (
    <OrderField
      as="checkbox"
      path="dataPrivacyAccepted"
      label={
        <Typography>
          Ich bin mit der{" "}
          <a target="_blank" href={url}>
            Datenschutzerklärung
          </a>{" "}
          einverstanden.
        </Typography>
      }
    />
  );
}
