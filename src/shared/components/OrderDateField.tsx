import React from "react";
import { NestedPath, Path, useOrderValue } from "../hooks";
import { formatISO, parseISO } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import { AppTextField } from "./AppTextField";

import de from "date-fns/locale/de";

interface Props<T> {
  path: Path;
  nestedPath?: NestedPath<T>;
  label?: React.ReactNode;
  minDate?: string;
  id?: string;
  required?: true;
}

export function OrderDateField<T>({
  path,
  id,
  label,
  nestedPath,
  required,
  minDate,
}: Readonly<Props<T>>) {
  const { value, setValue } = useOrderValue<T>(path, nestedPath);

  const min = minDate ? new Date(minDate) : new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <DatePicker
        slots={{ textField: AppTextField }}
        disablePast
        minDate={min}
        value={typeof value === "string" ? parseISO(value) : undefined}
        onChange={(v) => {
          setValue(formatISO(v as Date, { representation: "date" }));
        }}
        label={label}
        slotProps={{
          textField: {
            id,
            required,
            fullWidth: true,
            sx: {
              "& input[type=text]": {
                border: "none !important",
                padding: `16px!important`,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
