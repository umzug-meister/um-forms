import { FormLabel, Grid } from "@mui/material";
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

function BohrArbeit({ service }: Readonly<Props>) {
  const [focused, setFocused] = useState(false);
  const { colli, onColliChange } = useServiceColli(service.id);

  return (
    <>
      <Grid item xs={8} sm={10}>
        <FormLabel focused={focused}>{service.name}</FormLabel>
      </Grid>
      <Grid item xs={4} sm={2}>
        <AppTextField
          size="small"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(ev) => onColliChange(ev.target.value)}
          value={colli}
          placeholder="Anzahl"
        />
      </Grid>
    </>
  );
}
