import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppPacking, Order, Service } from "um-types";
import ContainerBox from "../../shared/components/ContainerBox";
import { OrderSwitchField } from "../../shared/components/OrderSwitchField";
import { AppState } from "../../store";

export default function Verpackung() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const services = useSelector<AppState, Service[]>((s) => s.app.services);

  const packings = services.filter(
    (s) => s.tag === "Packmaterial" && s.show
  ) as AppPacking[];

  return (
    <ContainerBox title="Verpackung benötigt?">
      <OrderSwitchField
        row
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
  const formatter = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    style: "currency",
  });

  return (
    <Grid item xs={12} sm={6}>
      <Card sx={{ height: "100%" }}>
        {packing.media && <CardMedia image={packing.media} />}
        <CardMedia></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {packing.name}
          </Typography>
          <Typography variant="body2">{packing.desc}</Typography>
          <Typography gutterBottom variant="h5">
            {formatter.format(Number(packing.price))}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
