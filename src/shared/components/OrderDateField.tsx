import React from "react";
import { NestedPath, Path, useOrderValue } from "../hooks";
import { AppTextField } from "./AppTextField";
import { formatISO } from "date-fns";

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
  const { value, setValue } = useOrderValue(path, nestedPath);

  const min = formatISO(minDate ? new Date(minDate) : new Date(), {
    representation: "date",
  });

  return (
    <AppTextField
      required={required}
      size="medium"
      value={value}
      type="date"
      inputProps={{ min }}
      id={id}
      label={label}
      onChange={(ev) => {
        setValue(ev.target.value);
      }}
    />
  );
}
