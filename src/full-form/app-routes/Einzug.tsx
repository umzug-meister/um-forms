import React from "react";
import { Address } from "um-types";
import ContainerBox from "../../shared/components/ContainerBox";
import OrderField from "../../shared/components/OrderField";
import { OrderSwitchField } from "../../shared/components/OrderSwitchField";
import {
  etagen,
  liftTypes,
  movementObjects,
  parkingDistances,
} from "../../shared/constants";

export default function Einzug() {
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
        label="Auszug aus"
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
      <OrderSwitchField<Address>
        path={path}
        nestedPath="montage"
        label="Möbel-Demontage"
      />
      <OrderSwitchField<Address>
        path={path}
        nestedPath="packservice"
        label="Umzugsgut auspacken"
      />
    </ContainerBox>
  );
}
