import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  Box,
  Card,
  CardContent,
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

  return (
    <Grid item xs={12}>
      <Card sx={{ height: "100%" }} variant="outlined">
        <CardContent>
          <Box display={"flex"} flexDirection="column" gap={2}>
            <Typography gutterBottom variant="h6" align="left">
              {packing.name}
            </Typography>

            <Divider />

            <Typography variant="body2">{packing.desc}</Typography>
            <Typography gutterBottom variant="h5" color="primary" align="right">
              {formatter.format(Number(packing.price))}
            </Typography>

            <Box display="flex" gap={2} justifyContent="end">
              <AppTextField
                InputProps={{
                  endAdornment: <ShoppingCartCheckoutIcon color="info" />,
                }}
                onChange={(ev) => onColliChange(ev.target.value)}
                value={colli}
                type="number"
                label="Anzahl"
                fullWidth={false}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
