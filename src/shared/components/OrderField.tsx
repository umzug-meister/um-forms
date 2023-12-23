import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Typography,
} from "@mui/material";
import { NestedPath, Path, useOrderValue } from "../hooks";
import { AppTextField } from "./AppTextField";

interface Props<T> {
  path: Path;
  nestedPath?: NestedPath<T>;
  label?: React.ReactNode;
  select?: true;
  selectOptions?: string[];
  type?: "text" | "email" | "number";
  as?: "default" | "checkbox";
  id?: string;
  required?: true;
  error?: boolean;
  placeholder?: string;
  multiline?: boolean;
  helperText?: string;
  endAdornment?: React.ReactNode;
}

export default function OrderField<T>({
  label,
  path,
  nestedPath,
  select,
  selectOptions,
  type,
  as,
  id,
  error,
  placeholder,
  multiline,
  helperText,
  endAdornment,
  required,
}: Props<T>) {
  const { value, setValue } = useOrderValue(path, nestedPath);

  if (as === "checkbox") {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(value)}
              onChange={(ev) => {
                setValue(ev.target.checked);
              }}
            />
          }
          label={label}
        />
      </FormGroup>
    );
  }

  return (
    <AppTextField
      required={required}
      size="medium"
      InputProps={{ endAdornment }}
      helperText={
        <Typography component="span" color="primary" variant="subtitle2">
          {helperText}
        </Typography>
      }
      error={error}
      type={type}
      id={id}
      select={select}
      value={value}
      onChange={(ev) => {
        setValue(ev.target.value);
      }}
      multiline={multiline}
      minRows={4}
      placeholder={placeholder}
      label={label}
    >
      {selectOptions?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </AppTextField>
  );
}
