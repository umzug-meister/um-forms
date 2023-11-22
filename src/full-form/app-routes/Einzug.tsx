import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Address, Order } from "um-types";
import ContainerBox from "../../shared/components/ContainerBox";
import OrderField from "../../shared/components/OrderField";
import { OrderSwitchField } from "../../shared/components/OrderSwitchField";
import {
  etagen,
  liftTypes,
  movementObjects,
  parkingDistances,
  typoProps,
} from "../../shared/constants";

import { AppState } from "../../store";

export default function Einzug() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const path = "to";
  return (
    <ContainerBox title="Einzugsadresse">
      <OrderField<Address>
        path={path}
        nestedPath="address"
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
        nestedPath="movementObject"
        select
        label="Einzug in"
        selectOptions={movementObjects}
      />
      <OrderField<Address>
        path={path}
        nestedPath="runningDistance"
        select
        label="Entfernung vom Parkplatz zu Haustür, in Meter"
        selectOptions={parkingDistances}
      />
      <OrderField<Address>
        path={path}
        nestedPath="floor"
        select
        label="Stockwerk"
        selectOptions={etagen}
      />
      <OrderField<Address>
        path={path}
        nestedPath="liftType"
        select
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
          <OrderField<Address>
            path={path}
            label={"Betten"}
            nestedPath={"bedNumber"}
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
    </ContainerBox>
  );
}
