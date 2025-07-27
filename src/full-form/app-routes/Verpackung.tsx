import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppPacking, Order, Service } from "@umzug-meister/um-core";
import { AppTextField } from "../../shared/components/AppTextField";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import ContainerBox from "../components/ContainerBox";
import { GridContainer } from "../../shared/components/GridContainer";
import { AppState } from "../../store";
import { OrderSwitchField } from "../components/OrderSwitchField";
import { useServiceColli } from "../hooks";
import { theme } from "../../shared/theme";
import { useMemo } from "react";

export default function Verpackung() {
  const order = useSelector<AppState, Order>((s) => s.app.current);
  const services = useSelector<AppState, Service[]>((s) => s.app.services);

  const packings = services.filter(
    (s) => s.tag === "Packmaterial" && s.show
  ) as AppPacking[];

  packings.sort((a, b) => a.sort - b.sort);

  return (
    <ContainerBox title="Verpackung benötigt?">
      <OrderSwitchField
        path="needPackings"
        label="Möchten Sie Verpackung bei uns kaufen?"
      />

      {order.needPackings && (
        <GridContainer alignItems={"stretch"} spacing={4}>
          {packings.map((packing) => (
            <PackingCard key={packing.id} packing={packing} />
          ))}
        </GridContainer>
      )}
    </ContainerBox>
  );
}
interface Props {
  packing: AppPacking;
}

function PackingCard({ packing }: Readonly<Props>) {
  const { colli, onColliChange } = useServiceColli(packing.id);

  const formatter = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    style: "currency",
  });

  const isInBasket = Number(colli) > 0;

  const headerTypoProps: TypographyProps = useMemo(
    () => ({
      variant: "h5",
      color: theme.palette.primary.main,
    }),
    []
  );

  return (
    <Grid item xs={12}>
      <Card elevation={0} sx={{ backgroundColor: theme.palette.grey[100] }}>
        <CardHeader
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography {...headerTypoProps}>{packing.name}</Typography>
              <Typography {...headerTypoProps}>
                {formatter.format(Number(packing.price))}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <ColFlexBox>
            <Typography variant="body2">{packing.desc}</Typography>
            <Box display="flex" justifyContent="end" width="100%">
              <AppTextField
                InputProps={{
                  endAdornment: isInBasket ? (
                    <CheckOutlinedIcon color="primary" />
                  ) : (
                    <ShoppingCartCheckoutOutlinedIcon color="disabled" />
                  ),
                }}
                inputProps={{ min: "0" }}
                onChange={(ev) => onColliChange(ev.target.value)}
                onBlur={(ev) => {
                  const value = Number(ev.target.value);

                  if (isNaN(value) || value <= 0) onColliChange("");
                }}
                value={colli}
                type="number"
                label="Anzahl"
                size="small"
                fullWidth={false}
              />
            </Box>
          </ColFlexBox>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Grid>
  );
}
