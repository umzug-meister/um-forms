import { Alert, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Address, Order } from "um-types";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import ContainerBox from "../../shared/components/ContainerBox";
import OrderField from "../../shared/components/OrderField";
import {
  etagen,
  liftTypes,
  movementObjects,
  parkingDistances,
  squares,
  typoProps,
} from "../../shared/constants";
import { AppState } from "../../store";
import { CustomItemsWidget } from "../components/CustomItemsWidget";
import { OrderSwitchField } from "../components/OrderSwitchField";
import StockwerkeToggle from "../components/StockwerkeToggle";

export default function Auszug() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const path = "from";

  return (
    <ContainerBox title="Auszug">
      <OrderField<Address>
        required
        path={path}
        nestedPath="address"
        enableMaps
        label="Auszugsadresse"
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
        required
        path={path}
        nestedPath="runningDistance"
        select
        label="Entfernung vom Parkplatz zu Haustür, in Meter"
        selectOptions={parkingDistances}
      />

      <OrderField<Address>
        required
        path={path}
        nestedPath="movementObject"
        select
        label="Auszug aus"
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
        </>
      )}

      <OrderField<Address>
        path={path}
        required
        nestedPath="roomsNumber"
        type="number"
        label="Anzahl der Zimmer"
      />

      <OrderField<Address>
        path={path}
        nestedPath="roomsToRelocate"
        type="number"
        label="Anzahl der Zimmer zum Umziehen"
        helperText="Falls nur ein Teil der Wohnung umgezogen wird"
      />

      <OrderField<Address>
        path={path}
        nestedPath="area"
        select
        required
        selectOptions={squares}
        label="Wohnfläche"
      />

      <Typography {...typoProps}>weitere Räumlichkeiten</Typography>

      <OrderSwitchField<Address>
        path={path}
        nestedPath="hasBasement"
        label="Keller"
      />

      <OrderSwitchField<Address>
        path={path}
        nestedPath="hasLoft"
        label="Dachboden"
      />

      <OrderSwitchField<Address>
        path={path}
        nestedPath="hasGarage"
        label="Garage"
      />

      <Typography {...typoProps}>gewünschte Leistungen</Typography>

      <OrderSwitchField<Address>
        path={path}
        nestedPath="packservice"
        label="Umzugsgut in Kartons einpacken"
      />

      <OrderSwitchField<Address>
        path={path}
        nestedPath="demontage"
        label="Möbel-Demontage"
      />

      {order.from.demontage && (
        <ColFlexBox>
          <ColFlexBox gap={1}>
            <Alert severity="info">
              Eine abschließende Montage der Küche ist zurzeit nicht möglich
            </Alert>
            <OrderField<Address>
              path={path}
              label="Küchenbreite"
              nestedPath={"kitchenWidth"}
              type="number"
              endAdornment="Meter"
              helperText="Breite der Küchenzeile zum Demontieren"
            />
          </ColFlexBox>

          <OrderField<Address>
            path={path}
            label={"Betten"}
            nestedPath={"bedNumber"}
            type="number"
            endAdornment="Stück"
            helperText="Anzahl der Betten zum Demontieren"
          />

          <OrderField<Address>
            path={path}
            label="Gesamtbreite der Schränke"
            nestedPath="wardrobeWidth"
            type="number"
            endAdornment="Meter"
            helperText="Breite aller Schränke zum Demontieren"
          />
        </ColFlexBox>
      )}

      <Typography {...typoProps}>besondere Gegenstände</Typography>

      <OrderSwitchField
        path="bulky"
        label="Sperrige und nicht zerlegbare Gegenstände"
      />
      {order.bulky && (
        <CustomItemsWidget propName="bulkyItems" breite tiefe hoehe />
      )}
      <OrderSwitchField
        path="heavy"
        label="Besonders schwere Gegenstände, ab 100kg"
      />
      {order.heavy && (
        <CustomItemsWidget propName="heavyItems" breite tiefe hoehe weight />
      )}
      <OrderSwitchField path="expensive" label="Antike und sehr wertvolle" />
      {order.expensive && <CustomItemsWidget propName="expensiveItems" />}
    </ContainerBox>
  );
}
