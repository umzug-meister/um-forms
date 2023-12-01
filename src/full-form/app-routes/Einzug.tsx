import { Alert, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Address, Order } from "um-types";
import ContainerBox from "../../shared/components/ContainerBox";
import OrderField from "../../shared/components/OrderField";
import {
  etagen,
  liftTypes,
  movementObjects,
  parkingDistances,
  typoProps,
} from "../../shared/constants";
import { OrderSwitchField } from "../components/OrderSwitchField";

import { AppState } from "../../store";
import { BohrarbeitenList } from "../components/BohrarbeitenList";
import StockwerkeToggle from "../components/StockwerkeToggle";

export default function Einzug() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const path = "to";

  return (
    <ContainerBox title="Einzug">
      <OrderField<Address>
        path={path}
        nestedPath="address"
        required
        enableMaps
        label="Einzugsadresse"
        id="from-input-field"
        placeholder="Straße Nr, PLZ Ort"
      />

      <OrderSwitchField<Address>
        path={path}
        nestedPath="parkingSlot"
        label="Park und Beladezone"
        labels={{
          true: "Vom Spediteur zu organisieren",
          false: "Wird von Kund:innen sichergestellt",
        }}
      />

      <OrderField<Address>
        path={path}
        required
        nestedPath="runningDistance"
        select
        label="Entfernung vom Parkplatz zu Haustür, in Meter"
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
        label="Umzugsgut auspacken"
      />

      <OrderSwitchField<Address>
        path={path}
        nestedPath="montage"
        label="Möbel-Montage"
      />
      {order.to.montage && (
        <>
          <Alert severity="info">
            Wir montieren ausschließlich Möbelstücke, die zuvor von uns
            demontiert wurden.
          </Alert>

          <OrderField<Address>
            path={path}
            label="Betten"
            nestedPath="bedNumber"
            type="number"
            endAdornment="Stück"
            helperText="Anzahl der Betten zum Montieren"
          />

          <OrderField<Address>
            path={path}
            label="Gesamtbreite der Schränke"
            nestedPath="wardrobeWidth"
            type="number"
            endAdornment="Meter"
            helperText="Breite aller Schränke zum Montieren"
          />
        </>
      )}

      <OrderSwitchField path="bohrarbeiten" label="Bohrarbeiten" />
      {order.bohrarbeiten && <BohrarbeitenList />}
    </ContainerBox>
  );
}
