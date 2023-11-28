import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, FormControl, FormLabel, IconButton } from "@mui/material";
import { useState } from "react";
import { AppTextField } from "../../shared/components/AppTextField";

interface Props {
  label: string;
  value?: number | string;
  onChange: (value: number) => void;
  step?: number;
}

export function NumberInput({
  label,
  onChange,
  value = "",
  step = 1,
}: Readonly<Props>) {
  const [currentValue, setCurrentValue] = useState(value);

  const onPlus = () => {
    setCurrentValue((cur) => Number(cur) + Number(step));
  };

  const onMinus = () => {
    setCurrentValue((cur) => {
      const next = Number(cur) - Number(step);
      return Math.max(next, 0);
    });
  };

  const onBlur = () => {
    onChange(Number(currentValue));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <FormLabel>{label}</FormLabel>

        <AppTextField
          fullWidth
          value={currentValue}
          size="small"
          type="number"
          onBlur={onBlur}
          onChange={handleInputChange}
          inputProps={{ step }}
          InputProps={{
            startAdornment: (
              <IconButton onClick={onMinus}>
                <RemoveOutlinedIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton onClick={onPlus}>
                <AddOutlinedIcon />
              </IconButton>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
}
