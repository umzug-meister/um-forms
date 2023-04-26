import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Address, AppPrice, Customer, Service } from "um-types";
import { scrollToRoot } from "../main";
import { AppDispatch, AppState } from "../store";
import { calculateOrder, uploadOrder } from "../store/appReducer";
import OrderField from "./OrderField";

const movementObjects = [
  "-",
  "Wohnung",
  "Haus",
  "Keller",
  "Lager",
  "Büro",
  "Garten",
];

const etagen = [
  "UG",
  "EG",
  ...[...new Array(8).keys()].map((k) => `${k + 1}. Etage`),
  "9+ Etage",
];

export function Inputs() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  const onUploadRequest = useCallback(() => {
    const cb = (id: number | string) => {
      setTimeout(() => {
        navigate(`/success/${id}`);
        scrollToRoot();
      }, 1000);
    };
    dispatch(calculateOrder());
    dispatch(uploadOrder(cb));
  }, [dispatch]);

  return (
    <Box
      display="flex"
      m="auto"
      flexDirection="column"
      gap={4}
      p={2}
      sx={{
        maxWidth: "900px",
      }}
    >
      <Box>
        <Grid container columnSpacing={3} rowSpacing={2}>
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
          <Grid item xs={12} sm={4}>
            <OrderField<Customer>
              path="customer"
              nestedPath="salutation"
              select
              label="Anrede"
              selectOptions={["-", "Frau", "Herr"]}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OrderField<Customer>
              path="customer"
              nestedPath="firstName"
              label="Vorname"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              label="E-Mail"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderField<Customer>
              path="customer"
              nestedPath="telNumber"
              label="Telefon"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h3">Wann?</Typography>
              <OrderField path="date" type="date" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container columnSpacing={3} rowSpacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h3">Woher?</Typography>
              <OrderField<Address>
                enableMaps
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
                label="Etage"
                selectOptions={etagen}
              />

              <OrderField<Address>
                path="from"
                nestedPath="movementObject"
                select
                label="Objekt"
                selectOptions={movementObjects}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h3">Wohin?</Typography>
              <OrderField<Address>
                enableMaps
                path="to"
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
                label="Etage"
                selectOptions={etagen}
              />

              <OrderField<Address>
                path="to"
                nestedPath="movementObject"
                select
                label="Objekt"
                selectOptions={movementObjects}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h3">Nachricht an uns</Typography>
              <OrderField<Address> path="text" multiline />
            </Box>
          </Grid>
        </Grid>
      </Box>

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
        <Button
          onClick={onUploadRequest}
          endIcon={<SendIcon />}
          variant="contained"
        >
          Anfragen
        </Button>
      </Box>
    </Box>
  );
}
