import { Divider, FormLabel, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppService, Service } from "@umzug-meister/um-core";
import { AppTextField } from "../../shared/components/AppTextField";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import { AppState } from "../../store";
import { useServiceColli } from "../hooks";

export function BohrarbeitenList() {
  const services = useSelector<AppState, Service[]>((s) => s.app.services);

  const bohrArbeiten: AppService[] = (
    services.filter((s) => s.tag === "Bohrarbeiten" && s.show) as AppService[]
  ).toSorted((a, b) => (a.sort || 0) - (b.sort || 0));

  return (
    <ColFlexBox>
      <Grid alignItems="center" container spacing={2}>
        {bohrArbeiten.map((b) => (
          <BohrArbeit service={b} key={b.id} />
        ))}
      </Grid>
    </ColFlexBox>
  );
}

interface Props {
  service: AppService;
}
const euroFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function EuroValue({ value }: { value: number | string | undefined }) {
  if (typeof value !== "undefined") {
    return (
      <Typography color={"primary.light"}>
        {euroFormatter.format(Number(value))}
      </Typography>
    );
  }
  return null;
}

function BohrArbeit({ service }: Readonly<Props>) {
  const [focused, setFocused] = useState(false);
  const { colli, onColliChange } = useServiceColli(service.id);

  return (
    <>
      <Grid item xs={12} sm={8}>
        <FormLabel focused={focused}>{service.name}</FormLabel>
      </Grid>
      <Grid item xs={6} sm={2}>
        <EuroValue value={service.price} />
      </Grid>
      <Grid item xs={6} sm={2}>
        <AppTextField
          size="small"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(ev) => onColliChange(ev.target.value)}
          value={colli}
          placeholder="Anzahl"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
}
