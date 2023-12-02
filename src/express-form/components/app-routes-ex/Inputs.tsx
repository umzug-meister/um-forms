import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Address, AppPrice, Service } from "um-types";
import { scrollToRoot } from "../../../main.ex";
import { ColFlexBox } from "../../../shared/components/ColFlexBox";
import ContainerBox from "../../../shared/components/ContainerBox";
import { CustomerData } from "../../../shared/components/CustomerData";
import { DataPrivacyCheck } from "../../../shared/components/DataPrivacyCheck";
import { GridContainer } from "../../../shared/components/GridContainer";
import OrderField from "../../../shared/components/OrderField";
import { etagen, movementObjects } from "../../../shared/constants";
import { SendButton } from "../../../shared/SendButton";
import { AppState } from "../../../store";

export default function Inputs() {
  const navigate = useNavigate();

  const services = useSelector<AppState, Service[]>((s) => s.app.services);
  const selectedId = useSelector<AppState, string | undefined>(
    (s) => s.app.selectedPriceID
  );

  const selectedOffer = (selectedId &&
    services.find((s) => s.id === selectedId)) as AppPrice | undefined;

  const imageSrc = useMemo(
    () =>
      `${import.meta.env.BASE_URL}${selectedOffer?.workers}_${
        selectedOffer?.t35
      }.png`,
    [selectedOffer]
  );

  return (
    <ContainerBox>
      <GridContainer>
        <Grid
          item
          xs={12}
          sx={{
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <img src={imageSrc} height={50} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Wir prüfen die Verfügbarkeit an dem gewählten Datum und melden uns
            schnellstmöglich bei Ihnen. Die Anfrage ist{" "}
            <strong>unverbindlich und kostenlos</strong>.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomerData />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ColFlexBox>
            <Typography variant="h4">Wann?</Typography>
            <OrderField path="date" type="date" />
          </ColFlexBox>
        </Grid>
      </GridContainer>

      <GridContainer>
        <Grid item xs={12} sm={6}>
          <ColFlexBox>
            <Typography variant="h4">Woher?</Typography>
            <OrderField<Address>
              enableMaps
              required
              label="Adresse"
              path="from"
              nestedPath="address"
              id="from-input-field"
              placeholder="Straße Nr, PLZ Ort"
            />

            <OrderField<Address>
              path="from"
              nestedPath="parkingSlot"
              label="Halteverbot?"
              as="checkbox"
            />

            <OrderField<Address>
              path="from"
              nestedPath="floor"
              select
              required
              label="Etage"
              selectOptions={etagen}
            />

            <OrderField<Address>
              path="from"
              required
              nestedPath="movementObject"
              select
              label="Objekt"
              selectOptions={movementObjects}
            />
          </ColFlexBox>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ColFlexBox>
            <Typography variant="h4">Wohin?</Typography>
            <OrderField<Address>
              enableMaps
              path="to"
              required
              label="Adresse"
              nestedPath="address"
              id="to-input-field"
              placeholder="Straße Nr, PLZ Ort"
            />

            <OrderField<Address>
              path="to"
              nestedPath="parkingSlot"
              label="Halteverbot?"
              as="checkbox"
            />

            <OrderField<Address>
              path="to"
              nestedPath="floor"
              select
              required
              label="Etage"
              selectOptions={etagen}
            />

            <OrderField<Address>
              path="to"
              nestedPath="movementObject"
              select
              required
              label="Objekt"
              selectOptions={movementObjects}
            />
          </ColFlexBox>
        </Grid>
      </GridContainer>
      <GridContainer>
        <Grid item xs={12}>
          <ColFlexBox>
            <Typography variant="h4">Nachricht an uns</Typography>
            <OrderField<Address> path="text" multiline />
          </ColFlexBox>
        </Grid>
      </GridContainer>
      <DataPrivacyCheck />

      <Box display="flex" m={2} gap={3} justifyContent="center">
        <Button
          onClick={() => {
            navigate("/");
            scrollToRoot();
          }}
          startIcon={<NavigateBeforeIcon />}
        >
          Zurück
        </Button>
        <SendButton scrollToRoot={scrollToRoot} src="express" />
      </Box>
    </ContainerBox>
  );
}
