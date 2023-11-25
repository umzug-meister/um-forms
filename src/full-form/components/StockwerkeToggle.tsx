import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Address } from "um-types";
import { useOrderValue } from "../../shared/hooks";
import { AppDispatch } from "../../store";
import { updateOrderProps } from "../../store/appReducer";

interface Props {
  path: "to" | "from";
}
const nestedPath: keyof Address = "stockwerke";

export default function StockwerkeToggle({ path }: Readonly<Props>) {
  const dispatch = useDispatch<AppDispatch>();

  const value = useOrderValue<Address>(path, nestedPath) || [];

  const handleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, value: string[]) => {
      dispatch(updateOrderProps({ path: [path, nestedPath], value }));
    },
    [path, nestedPath]
  );

  return (
    <ToggleButtonGroup
      fullWidth
      color="primary"
      value={value}
      onChange={handleChange}
    >
      <ToggleButton value="UG">UG</ToggleButton>
      <ToggleButton value="EG">EG</ToggleButton>
      <ToggleButton value="1.OG">1.OG</ToggleButton>
      <ToggleButton value="2.OG">2.OG</ToggleButton>
    </ToggleButtonGroup>
  );
}
