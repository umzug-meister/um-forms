import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { AppOptions } from "../../store/appReducer";
import OrderField from "./OrderField";

export function DataPrivacyCheck() {
  const options = useSelector<AppState, AppOptions>((s) => s.app.options);

  return (
    <OrderField
      as="checkbox"
      path="dataPrivacyAccepted"
      label={
        <Typography>
          Ich bin mit der{" "}
          <a target="_blank" href={options["dataPrivacyUrl"]}>
            Datenschutzerklärung
          </a>{" "}
          einverstanden.
        </Typography>
      }
    />
  );
}
