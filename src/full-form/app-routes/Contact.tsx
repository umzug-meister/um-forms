import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Order } from "um-types";
import ContainerBox from "../components/ContainerBox";
import { CustomerData } from "../../shared/components/CustomerData";
import { GridContainer } from "../../shared/components/GridContainer";
import { OrderDateField } from "../../shared/components/OrderDateField";
import { AppState } from "../../store";
import { OrderSwitchField } from "../components/OrderSwitchField";

export default function Contact() {
  const { isDateFix, date_from } = useSelector<AppState, Order>(
    (s) => s.app.current
  );
  return (
    <ContainerBox>
      <CustomerData />

      <OrderSwitchField
        path="costsAssumption"
        label="Kostenübernahme durch Arbeitsamt, ARGE etc?"
      />
      <OrderSwitchField path="isDateFix" label="Steht der Umzugstermin fest?" />
      {isDateFix ? (
        <GridContainer justifyContent={"center"}>
          <Grid item xs={12} sm={6}>
            <OrderDateField
              key="date"
              path="date"
              label="Umzugstermin"
              required
            />
          </Grid>
        </GridContainer>
      ) : (
        <GridContainer>
          <Grid item xs={12} sm={6}>
            <OrderDateField
              key="date_from"
              path="date_from"
              label="frühester Umzugstermin"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderDateField
              minDate={date_from}
              key="date_to"
              path="date_to"
              label="spätester Umzugstermin"
              required
            />
          </Grid>
        </GridContainer>
      )}
    </ContainerBox>
  );
}
