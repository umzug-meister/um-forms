import React from "react";
import ContainerBox from "../../shared/components/ContainerBox";
import OrderField from "../../shared/components/OrderField";

export default function Request() {
  return (
    <ContainerBox title="Auftrag absenden">
      <OrderField
        path="text"
        multiline
        label="Nachricht an uns"
        placeholder="sollten wir noch etwas wissen..."
      />
    </ContainerBox>
  );
}
