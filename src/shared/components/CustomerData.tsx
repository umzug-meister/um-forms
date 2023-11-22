import { Box, Grid } from "@mui/material";
import { Customer } from "um-types";
import OrderField from "./OrderField";

export function CustomerData() {
  return (
    <form>
      <Box display="flex" flexDirection={"column"} gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="salutation"
              select
              label="Anrede"
              selectOptions={["-", "Frau", "Herr"]}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid sx={{ gridRowStart: 2 }} item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="firstName"
              label="Vorname"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="lastName"
              label="Nachname"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="email"
              type="email"
              label="E-Mail"
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
        </Grid>
      </Box>
    </form>
  );
}
