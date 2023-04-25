import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Address, AppPrice, Customer, Service } from "um-types";
import { AppDispatch, AppState } from "../store";
import { calculateOrder, uploadOrder } from "../store/appReducer";
import OrderField from "./OrderField";

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
    () => `/assets/${selectedOffer?.workers}_${selectedOffer?.t35}.png`,
    [selectedOffer]
  );

  const onUploadRequest = useCallback(() => {
    const cb = (id: number | string) => {
      setTimeout(() => {
        navigate(`/success/${id}`);
        window.scrollTo({ top: 0 });
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
        </Grid>
      </Box>

      <Box>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h3">Wann?</Typography>
              <OrderField path="date" type="date" label="Datum" />
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
              />

              <OrderField<Address>
                path="from"
                nestedPath="parkingSlot"
                label="Halteverbot?"
                as="checkbox"
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
              />
              <OrderField<Address>
                path="to"
                nestedPath="parkingSlot"
                label="Halteverbot?"
                as="checkbox"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" m={2} gap={3} justifyContent="center">
        <Button
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0 });
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
          Absenden
        </Button>
      </Box>
    </Box>
  );
}
