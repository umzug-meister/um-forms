import { useCallback, useMemo } from "react";

import { Box, FormControlLabel, Radio, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppPrice, Service } from "@umzug-meister/um-core";
import { scrollToRoot } from "../../main.ex";
import { AppButton } from "../../shared/components/AppButton";
import { AppDispatch, AppState } from "../../store";
import { setSelectedPriceId } from "../../store/appReducer";

interface Props {
  transporter: number;
  workers: number;
  primary: string;
  secondary: string;
}

export function OfferCard({
  transporter,
  workers,
  primary,
  secondary,
}: Readonly<Props>) {
  const navigate = useNavigate();
  const selectedPriceID = useSelectedId();
  const imageSrc = useMemo(
    () => `${import.meta.env.BASE_URL}${workers}_${transporter}.png`,
    [transporter, workers]
  );

  const offers = useOffers(transporter, workers);

  if (!offers.length) return null;

  const { hourPrice, ridingCosts } = offers[0];
  const showButton = offers.some((o) => o.id == selectedPriceID);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{ backgroundColor: primary, height: "100%" }}
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <Box
          //image-box
          sx={{
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: secondary,
          }}
        >
          <img src={imageSrc} height={50} />
        </Box>
        <Box
          //white divider
          sx={{ background: "white", height: "4px" }}
        />
        <Box padding={1} display="flex" gap={2} flexDirection="column">
          <Box m={"auto"}>
            <Typography>
              <strong>{`${workers} Träger + ${
                transporter == 1 ? "" : transporter
              } LKW 3,5 Tonner`}</strong>
            </Typography>
          </Box>
          <Box display="flex" m="auto" flexDirection="column">
            {offers.map(OfferLine)}
          </Box>
          <Box m={"auto"}>
            <Typography
              sx={{
                color: "#2B2B2B",
              }}
            >{`Jede weitere Stunde: ${hourPrice} €`}</Typography>
          </Box>
          <Box m={"auto"}>
            <Typography
              sx={{
                color: "#2B2B2B",
              }}
            >{`Spritgeld & Fahrt: ab ${ridingCosts || "/"} €`}</Typography>
          </Box>
          <Box
            // button-wrapper
            m="auto"
            sx={{ height: "46px" }}
          >
            {showButton && (
              <AppButton
                onClick={() => {
                  navigate("inputs");
                  scrollToRoot();
                }}
                variant="contained"
                disableElevation
              >
                Unverbindlich anfragen
              </AppButton>
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

function OfferLine(offer: Readonly<AppPrice>) {
  const { sum, includedHours, id } = offer;

  const dispatch = useDispatch<AppDispatch>();

  const selectedPriceID = useSelectedId();

  const updateId = useCallback(
    (id: number) => {
      dispatch(setSelectedPriceId({ id }));
    },
    [dispatch]
  );

  const label = useMemo(() => {
    return `${sum} € | ${includedHours} Stunden`;
  }, [offer]);

  return (
    <FormControlLabel
      key={id}
      sx={{
        color: "#2B2B2B",
      }}
      label={label}
      control={
        <Radio
          checked={selectedPriceID == id}
          onChange={(event) => {
            const { checked } = event.target;
            if (checked) {
              updateId(id);
            }
          }}
        />
      }
    />
  );
}

function useOffers(transporter: number, workers: number) {
  const services = useSelector<AppState, Service[]>((s) => s.app.services);

  const offers = services.filter(isOffer);

  return offers
    .filter((offer) => offer.workers == workers && offer.t35 == transporter)
    .sort((a, b) => Number(a.includedHours) - Number(b.includedHours));
}

function isOffer(service: Service): service is AppPrice {
  return service.tag === "Price";
}

function useSelectedId() {
  const selectedPriceID = useSelector<AppState, number | undefined>(
    (s) => s.app.selectedPriceID
  );
  return selectedPriceID;
}
