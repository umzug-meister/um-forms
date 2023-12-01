import { Grid } from "@mui/material";
import { Customer } from "um-types";
import { ColFlexBox } from "./ColFlexBox";
import { GridContainer } from "./GridContainer";
import OrderField from "./OrderField";

export function CustomerData() {
  return (
    <form>
      <ColFlexBox>
        <GridContainer>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="salutation"
              select
              label="Anrede"
              selectOptions={["-", "Frau", "Herr"]}
            />
          </Grid>
        </GridContainer>
        <GridContainer>
          <Grid sx={{ gridRowStart: 2 }} item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="firstName"
              label="Vorname"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="lastName"
              label="Nachname"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="email"
              type="email"
              label="E-Mail"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="telNumber"
              label="Telefon"
              type="number"
            />
          </Grid>
        </GridContainer>
      </ColFlexBox>
    </form>
  );
}
