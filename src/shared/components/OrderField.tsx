import { Loader } from "@googlemaps/js-api-loader";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateOrderProps } from "../../store/appReducer";
import { NestedPath, Path, useOption, useOrderValue } from "../hooks";

interface Props<T> {
  path: Path;
  nestedPath?: NestedPath<T>;
  label?: string;
  select?: true;
  enableMaps?: true;
  selectOptions?: string[];
  type?: "text" | "date" | "email" | "number";
  as?: "default" | "checkbox";
  id?: string;
  error?: boolean;
  placeholder?: string;
  multiline?: boolean;
  helperText?: string;
  endAdornment?: React.ReactNode;
}

const options = {
  fields: ["formatted_address", "address_components"],
  componentRestrictions: { country: ["de", "at", "ch"] },
};

export default function OrderField<T>({
  label,
  path,
  nestedPath,
  select,
  selectOptions,
  type,
  as,
  enableMaps,
  id,
  error,
  placeholder,
  multiline,
  helperText,
  endAdornment,
}: Props<T>) {
  const value = useOrderValue(path, nestedPath);
  const dispatch = useDispatch<AppDispatch>();
  const gapiKey = useOption("gapikey");

  const loaderRef = useRef<Loader | null>(null);

  const handleChange = useCallback(
    (value: any) => {
      const propPath: string[] = [path];
      if (nestedPath) {
        propPath.push(String(nestedPath));
      }
      dispatch(updateOrderProps({ path: propPath, value }));
    },
    [path, nestedPath]
  );

  useEffect(() => {
    if (enableMaps && gapiKey) {
      if (loaderRef.current == null) {
        loaderRef.current = new Loader({
          apiKey: gapiKey,
          libraries: ["places"],
        });
      }

      loaderRef.current.load().then((google) => {
        const autocomplete = new google.maps.places.Autocomplete(
          document.getElementById(id!) as any,
          options
        );

        autocomplete.addListener("place_changed", () => {
          const { formatted_address } = autocomplete.getPlace();
          if (formatted_address) {
            handleChange(formatted_address.replace(", Deutschland", ""));
          }
        });
      });
    }
  }, [enableMaps, gapiKey, handleChange]);

  if (as === "checkbox") {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(value)}
              onChange={(ev) => {
                handleChange(ev.target.checked);
              }}
            />
          }
          label={label}
        />
      </FormGroup>
    );
  }

  return (
    <Box
      sx={{
        "& input[type=text]": {
          border: "none !important",
          padding: "16px!important",
        },
      }}
    >
      <TextField
        InputProps={{ endAdornment }}
        helperText={
          <Typography color={"primary"} variant="body2">
            {helperText}
          </Typography>
        }
        error={error}
        type={type}
        id={id}
        select={select}
        value={value}
        onChange={(ev) => {
          handleChange(ev.target.value);
        }}
        multiline={multiline}
        minRows={4}
        placeholder={placeholder}
        label={label}
        fullWidth
        variant="outlined"
      >
        {selectOptions?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
