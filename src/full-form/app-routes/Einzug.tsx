import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Address, Order } from "@umzug-meister/um-core";
import {
  etagen,
  liftTypes,
  movementObjects,
  parkingDistances,
} from "@umzug-meister/um-core/constants";
import ContainerBox from "../components/ContainerBox";
import OrderField from "../../shared/components/OrderField";
import { typoProps } from "../../shared/constants";
import { OrderSwitchField } from "../components/OrderSwitchField";

import { AppState } from "../../store";
import { AppInfo } from "../components/AppInfo";
import { BohrarbeitenList } from "../components/BohrarbeitenList";
import StockwerkeToggle from "../components/StockwerkeToggle";
import { HVZInfo } from "../components/HVZInfo";
import { AddressAutocomplete } from "../../shared/components/AddressAutocomplete";

export default function Einzug() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const path = "to";

  return (
    <ContainerBox title="Einzug">
      <AddressAutocomplete path="to" />

      <OrderSwitchField<Address>
        path={path}
        nestedPath="parkingSlot"
        label="Park und Beladezone"
        labels={{
          true: "Vom Spediteur zu organisieren",
          false: "Wird von Kund:innen sichergestellt",
        }}
      />

      <HVZInfo show={order.to.parkingSlot} />

      <OrderField<Address>
        path={path}
        required
        nestedPath="runningDistance"
        select
        label="Entfernung vom Parkplatz zur Haustür"
        selectOptions={parkingDistances}
      />

      <OrderField<Address>
        path={path}
        required
        nestedPath="movementObject"
        select
        label="Einzug in"
        selectOptions={movementObjects}
      />

      {order[path].movementObject === "Haus" && (
        <StockwerkeToggle path={path} />
      )}

      {order[path].movementObject !== "Haus" && (
        <>
          <OrderField<Address>
            path={path}
            nestedPath="floor"
            select
            required
            label="Stockwerk"
            selectOptions={etagen}
          />
          <OrderField<Address>
            path={path}
            nestedPath="liftType"
            select
            required
            label="Fahrstuhl"
            selectOptions={liftTypes}
          />
          <OrderSwitchField<Address>
            path={path}
            nestedPath="isAltbau"
            label="Altbau"
          />
          <OrderSwitchField<Address>
            path={path}
            nestedPath="hasLoft"
            label="Dachboden"
          />
        </>
      )}

      <Typography {...typoProps}>gewünschte Leistungen</Typography>

      <OrderSwitchField<Address>
        path={path}
        nestedPath="packservice"
        label="Auspackservice (Umzugsgut auspacken)"
      />

      <OrderSwitchField<Address>
        path={path}
        nestedPath="montage"
        label="Möbel Aufbau"
      />
      {order.to.montage && (
        <>
          <AppInfo
            text={
              <>
                Wir montieren ausschließlich Möbelstücke, die zuvor von uns
                abgebaut wurden. Bitte beachten Sie, dass der Aufbau keine&nbsp;
                <b>Bohrarbeiten</b> oder das Aufhängen von Elementen umfasst.
                Falls Sie eine <b>Wandmontage</b> wünschen, teilen Sie uns dies
                gerne im nächsten Schritt mit.
              </>
            }
          />
        </>
      )}

      <OrderSwitchField path="bohrarbeiten" label="Bohrarbeiten" />
      {order.bohrarbeiten && <BohrarbeitenList />}
    </ContainerBox>
  );
}
