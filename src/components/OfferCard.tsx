import { useCallback, useMemo } from "react";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { AppPrice } from "um-types";
import { AppDispatch, AppState } from "../store";
import { setSelectedPriceId } from "../store/appReducer";
import { useNavigate } from "react-router-dom";
import { scrollToRoot } from "../main";

interface Props {
  transporter: number;
  workers: number;
  primary: string;
  secondary: string;
}

export function OfferCard({ transporter, workers, primary, secondary }: Props) {
  const navigate = useNavigate();
  const selectedPriceID = useSelectedId();
  const imageSrc = useMemo(
    () => `${import.meta.env.BASE_URL}${workers}_${transporter}.png`,
    [transporter, workers]
  );

  const offers = useOffers(transporter, workers);
  const { hourPrice } = offers[0];

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
        <Box
          paddingX={2}
          paddingY={3}
          display="flex"
          gap={3}
          flexDirection="column"
        >
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
            >{`Jede weitere Stunde ${hourPrice} €`}</Typography>
          </Box>
          <Box
            // button-wrapper
            m="auto"
            sx={{ height: "36px" }}
          >
            {showButton && (
              <Button
                onClick={() => {
                  navigate("inputs");
                  scrollToRoot();
                }}
                variant="contained"
                disableElevation
              >
                Unverbindlich anfragen
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

function OfferLine(offer: AppPrice) {
  const { sum, includedHours, id } = offer;

  const dispatch = useDispatch<AppDispatch>();

  const selectedPriceID = useSelectedId();

  const updateId = useCallback(
    (id: string) => {
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
  const offers = useSelector<AppState, AppPrice[]>(
    (s) => s.app.services as any
  );

  return offers
    .filter(
      (o) => o.tag == "Price" && o.workers == workers && o.t35 == transporter
    )
    .sort((a, b) => Number(a.includedHours) - Number(b.includedHours));
}

function useSelectedId() {
  const selectedPriceID = useSelector<AppState, string | undefined>(
    (s) => s.app.selectedPriceID
  );
  return selectedPriceID;
}
