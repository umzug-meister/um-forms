import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Order } from "um-types";
import ContainerBox from "../../shared/components/ContainerBox";
import { CustomerData } from "../../shared/components/CustomerData";
import OrderField from "../../shared/components/OrderField";
import { AppState } from "../../store";

export default function Contact() {
  const { isDateFix } = useSelector<AppState, Order>((s) => s.app.current);
  return (
    <ContainerBox>
      <CustomerData />

      <OrderField
        path="costsAssumption"
        label="Kostenübernahme von Arbeitsamt, ARGE etc?"
        as="switch"
      />
      <OrderField
        path="isDateFix"
        label="Steht der Umzugstermin fest?"
        as="switch"
      />
      {isDateFix ? (
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} sm={6}>
            <OrderField path="date" type="date" label="Umzugstermin" />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <OrderField
              path="date_from"
              type="date"
              label="frühester Umzugstermin"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderField
              path="date_to"
              type="date"
              label="spätester Umzugstermin"
            />
          </Grid>
        </Grid>
      )}
    </ContainerBox>
  );
}
