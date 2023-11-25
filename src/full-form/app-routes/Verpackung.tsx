import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppPacking, Order, Service } from "um-types";
import { AppTextField } from "../../shared/components/AppTextField";
import ContainerBox from "../../shared/components/ContainerBox";
import { OrderSwitchField } from "../components/OrderSwitchField";
import { AppState } from "../../store";
import { useServiceColli } from "../hooks";

export default function Verpackung() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const services = useSelector<AppState, Service[]>((s) => s.app.services);

  const packings = services.filter(
    (s) => s.tag === "Packmaterial" && s.show
  ) as AppPacking[];

  packings.sort((a, b) => a.sort - b.sort);

  return (
    <ContainerBox title="Verpackung benötigt?">
      <OrderSwitchField
        path="needPackings"
        label="Möchten Sie Verpackung bei uns kaufen?"
      />

      {order.needPackings && (
        <Grid container spacing={4}>
          {packings.map((packing) => (
            <PackingCard key={packing.id} packing={packing} />
          ))}
        </Grid>
      )}
    </ContainerBox>
  );
}
interface Props {
  packing: AppPacking;
}

function PackingCard({ packing }: Readonly<Props>) {
  const { colli, onColliChange } = useServiceColli(packing.id);

  const formatter = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    style: "currency",
  });

  const isInBasket = Number(colli) > 0;

  return (
    <Grid item xs={12}>
      <Card sx={{ height: "100%" }} variant="outlined">
        <CardHeader
          sx={{
            background: "#e7e2da",
          }}
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{packing.name}</Typography>
              <Typography variant="h6" align="right">
                {formatter.format(Number(packing.price))}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body2">{packing.desc}</Typography>
            <Box display="flex" justifyContent="end" width="100%">
              <AppTextField
                InputProps={{
                  endAdornment: isInBasket ? (
                    <CheckOutlinedIcon color="primary" />
                  ) : (
                    <ShoppingCartCheckoutOutlinedIcon color="disabled" />
                  ),
                }}
                inputProps={{ min: "0" }}
                onChange={(ev) => onColliChange(ev.target.value)}
                onBlur={(ev) => {
                  const value = Number(ev.target.value);

                  if (isNaN(value) || value <= 0) onColliChange("");
                }}
                value={colli}
                type="number"
                label="Anzahl"
                size="small"
                fullWidth={false}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
