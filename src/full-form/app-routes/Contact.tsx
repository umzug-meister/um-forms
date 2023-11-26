import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Order } from "um-types";
import ContainerBox from "../../shared/components/ContainerBox";
import { CustomerData } from "../../shared/components/CustomerData";
import { GridContainer } from "../../shared/components/GridContainer";
import OrderField from "../../shared/components/OrderField";
import { AppState } from "../../store";
import { OrderSwitchField } from "../components/OrderSwitchField";

export default function Contact() {
  const { isDateFix } = useSelector<AppState, Order>((s) => s.app.current);
  return (
    <ContainerBox>
      <CustomerData />

      <OrderSwitchField
        path="costsAssumption"
        label="Kostenübernahme von Arbeitsamt, ARGE etc?"
      />
      <OrderSwitchField path="isDateFix" label="Steht der Umzugstermin fest?" />
      {isDateFix ? (
        <GridContainer justifyContent={"center"}>
          <Grid item xs={12} sm={6}>
            <OrderField path="date" type="date" label="Umzugstermin" />
          </Grid>
        </GridContainer>
      ) : (
        <GridContainer>
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
        </GridContainer>
      )}
    </ContainerBox>
  );
}
