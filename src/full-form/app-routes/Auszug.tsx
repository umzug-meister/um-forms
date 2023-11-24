import { Alert, Box, Typography, TypographyProps } from "@mui/material";
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

export default function Auszug() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const path = "from";

  return (
    <ContainerBox title="Auszugsadresse">
      <OrderField<Address>
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
        path={path}
        nestedPath="runningDistance"
        select
        label="Entfernung vom Parkplatz zu Haustür, in Meter"
        selectOptions={parkingDistances}
      />

      <OrderField<Address>
        path={path}
        nestedPath="movementObject"
        select
        label="Auszug aus"
        selectOptions={movementObjects}
      />

      {/* stockwerke im Haus */}

      {order.from.movementObject !== "Haus" && (
        <>
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
        </>
      )}

      <OrderField<Address>
        path={path}
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
        type="number"
        label="Wohnfläche"
        endAdornment="m²"
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
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={0.5}>
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
          </Box>

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
        </Box>
      )}

      <Typography {...typoProps}>besondere Gegenstände</Typography>

      <OrderSwitchField
        path="bulky"
        label="Sperrige und nicht zerlegbare Gegenstände"
      />
      {order.bulky && (
        <OrderField
          path="bulkyText"
          multiline
          placeholder="Bitte listen Sie alle sperrige Gegenstände auf und geben Sie die Maßen an."
        />
      )}
      <OrderSwitchField
        path="heavy"
        label="Besonders schwere Gegenstände, ab 100kg"
      />
      {order.heavy && (
        <OrderField
          path="heavyText"
          multiline
          placeholder="Bitte listen Sie alle schweren Gegenstände auf und geben Sie die Maßen sowie das Gewicht an."
        />
      )}
      <OrderSwitchField path="expensive" label="Antike und sehr wertvolle" />
      {order.expensive && (
        <OrderField
          path="expensiveText"
          multiline
          placeholder="Bitte listen Sie alle antike und sehr wertvolle Gegenstände an."
        />
      )}
    </ContainerBox>
  );
}
