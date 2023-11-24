import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useId } from "react";
import { useDispatch } from "react-redux";
import { Order } from "um-types";
import { AppDispatch } from "../../store";
import { updateOrderProps } from "../../store/appReducer";
import { useOrderValue } from "../../shared/hooks";

type Path = keyof Order;
type NestedPath<T> = keyof T;

interface Props<T> {
  path: Path;
  nestedPath?: NestedPath<T>;
  label?: string;
  labels?: {
    true: string;
    false: string;
  };
}

export function OrderSwitchField<T>({
  nestedPath,
  path,
  label,
  labels,
}: Readonly<Props<T>>) {
  const theme = useTheme();
  const narrowScreen = useMediaQuery(theme.breakpoints.down("md"));

  const value = useOrderValue(path, nestedPath);

  const dispatch = useDispatch<AppDispatch>();

  const labelId = useId();

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
        row={!narrowScreen}
        sx={{ paddingLeft: 3 }}
        onChange={(event) => handleChange(event?.target.value === "true")}
        value={Boolean(value)}
      >
        <FormControlLabel
          labelPlacement="start"
          value={true}
          control={<Radio />}
          label={labels?.true ?? "Ja"}
        />
        <FormControlLabel
          labelPlacement="start"
          value={false}
          control={<Radio />}
          label={labels?.false ?? "Nein"}
        />
      </RadioGroup>
    </FormControl>
  );
}
