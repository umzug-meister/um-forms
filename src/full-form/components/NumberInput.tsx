import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, FormLabel, IconButton, useTheme } from "@mui/material";
import { AppTextField } from "../../shared/components/AppTextField";
import { getButtonColors } from "../../shared/components/wp-style-fixes";

interface Props {
  label: string;
  value?: number | string;
  onChange: (value: number) => void;
  step?: number;
  category?: string;
}

export function NumberInput({
  label,
  onChange,
  value = "",
  step = 1,
  category,
}: Readonly<Props>) {
  const theme = useTheme();

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
  const buttonColors = getButtonColors("outlined", theme);

  const buttonSx = {
    "&:focus": {
      color: `${buttonColors.color}!important`,
      backgroundColor: `${buttonColors.bgColor}!important`,
    },
    "&:hover": {
      color: `${buttonColors.color}!important`,
      backgroundColor: `${buttonColors.hoverBGColor}!important`,
    },
  };

  const htmlInputId = `${label}-${category}`;

  return (
    <Box>
      {/*@ts-ignore*/}
      <FormLabel color="info" for={htmlInputId}>
        {label}
      </FormLabel>
      <AppTextField
        id={htmlInputId}
        fullWidth
        sx={{ textAlign: "center" }}
        value={value}
        size="small"
        type="number"
        onChange={handleInputChange}
        inputProps={{ step, style: { border: "0px" } }}
        InputProps={{
          sx: { fontWeight: "bold" },
          startAdornment: (
            <IconButton sx={buttonSx} onClick={onMinus}>
              <RemoveOutlinedIcon />
            </IconButton>
          ),
          endAdornment: (
            <IconButton sx={buttonSx} onClick={onPlus}>
              <AddOutlinedIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
