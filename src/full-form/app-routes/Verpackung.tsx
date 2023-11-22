import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppPacking, Service } from "um-types";
import ContainerBox from "../../shared/components/ContainerBox";
import { AppState } from "../../store";

export default function Verpackung() {
  const services = useSelector<AppState, Service[]>((s) => s.app.services);

  const packings = services.filter(
    (s) => s.tag === "Packmaterial"
  ) as AppPacking[];

  return (
    <ContainerBox title="Verpackung benötigt?">
      {packings.map((packing) => (
        <PackingCard key={packing.id} packing={packing} />
      ))}
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
    <Card variant="outlined">
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
  );
}
