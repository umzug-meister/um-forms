import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Address } from "@umzug-meister/um-core";
import { useOrderValue } from "../../shared/hooks";

interface Props {
  path: "to" | "from";
}
const nestedPath: keyof Address = "stockwerke";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function StockwerkeToggle({ path }: Readonly<Props>) {
  const { value, setValue } = useOrderValue<Address>(path, nestedPath) || [];

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        border: (theme) => `1px solid ${theme.palette.grey[400]}`,
        flexWrap: "wrap",
      }}
    >
      <StyledToggleButtonGroup
        fullWidth
        color="primary"
        value={value}
        onChange={(_, value) => setValue(value)}
      >
        <ToggleButton value="UG">UG</ToggleButton>
        <ToggleButton value="EG">EG</ToggleButton>
        <ToggleButton value="1.OG">1.OG</ToggleButton>
        <ToggleButton value="2.OG">2.OG</ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}
