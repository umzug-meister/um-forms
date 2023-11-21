import { Loader } from "@googlemaps/js-api-loader";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useId, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { Order } from "um-types";
import { AppOptions, updateOrderProps } from "../../store/appReducer";

type Path = keyof Order;
type NestedPath<T> = keyof T;

interface Props<T> {
  path: Path;
  nestedPath?: NestedPath<T>;
  label?: string;
  select?: true;
  enableMaps?: true;
  selectOptions?: string[];
  type?: "text" | "date";
  as?: "default" | "checkbox" | "switch";
  id?: string;
  error?: boolean;
  placeholder?: string;
  multiline?: boolean;
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
}: Props<T>) {
  const value = useOrderValue(path, nestedPath);
  const dispatch = useDispatch<AppDispatch>();
  const gapiKey = useOption("gapikey");

  const labelId = useId();

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

  if (as === "switch") {
    return (
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel id={labelId}>{label}</FormLabel>
        <RadioGroup
          row
          onChange={(event) => handleChange(event?.target.value === "true")}
          value={Boolean(value)}
        >
          <FormControlLabel value={true} control={<Radio />} label={"Ja"} />
          <FormControlLabel value={false} control={<Radio />} label={"Nein"} />
        </RadioGroup>
      </FormControl>
    );
  }

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
          padding: "8.5px 14px!important",
        },
      }}
    >
      <TextField
        size="small"
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

function useOrderValue<T>(path: Path, nestedPath?: NestedPath<T>) {
  const order = useSelector<AppState, Order>((s) => s.app.current!);

  let value = order[path];
  if (nestedPath && typeof value === "object") {
    //@ts-ignore
    value = value[nestedPath];
  }
  return value || "";
}

export function useOption(name: string) {
  const options = useSelector<AppState, AppOptions>((s) => s.app.options);
  const value = options[name];
  return value;
}
