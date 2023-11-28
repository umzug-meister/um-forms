import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, FormLabel, IconButton } from "@mui/material";
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
  const onPlus = () => {
    onChange(Number(value) + Number(step));
  };

  const onMinus = () => {
    const next = Number(value) - Number(step);
    onChange(Math.max(next, 0));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <Box>
      <FormLabel color="primary">{label}</FormLabel>

      <AppTextField
        fullWidth
        value={value}
        size="small"
        type="number"
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
    </Box>
  );
}
