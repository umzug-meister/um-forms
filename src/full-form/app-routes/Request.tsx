import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ContainerBox from "../components/ContainerBox";
import { DataPrivacyCheck } from "../../shared/components/DataPrivacyCheck";
import OrderField from "../../shared/components/OrderField";
import { SendButton } from "../../shared/SendButton";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { LazyLoad } from "../../shared/components/LazyLoad";
import { lazy } from "react";
import { AppInfo } from "../components/AppInfo";
import { ColFlexBox } from "../../shared/components/ColFlexBox";

const FurnitureCalculator = lazy(
  () => import("../../shared/components/FurnitureCalculator")
);
const ImageUploader = lazy(
  () => import("../../shared/components/ImageUploader")
);

export default function Request() {
  return (
    <ContainerBox title="Auftrag absenden">
      <ColFlexBox>
        <AppInfo
          text={
            <>
              Um Ihnen ein <strong>präziseres Angebot</strong> erstellen zu
              können, benötigen wir weitere Informationen zu Ihren Möbeln.
            </>
          }
        />
        <AppInfo
          text={
            <>
              Hierbei stehen Ihnen folgende Möglichkeiten zur Verfügung:
              <ul>
                <li>Bilder anhängen</li>
                <li>Umzugsvolumen berechnen</li>
              </ul>
            </>
          }
        />
      </ColFlexBox>

      <Box>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography variant="h6" color="primary">
              Bilder anhängen
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" mb={2}>
              Laden Sie bitte hier Ihre Bilder hoch. So können wir uns ein
              besseres Bild von Ihrem Umzugsvolumen machen und Ihnen optimal
              weiterhelfen.
            </Typography>
            <LazyLoad>
              <ImageUploader />
            </LazyLoad>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography variant="h6" color="primary">
              Umzugsvolumen berechnen
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" mb={2}>
              Nutzen Sie doch einfach unseren praktischen Rechner, um Ihre
              Umzugsliste zu erstellen und das Umzugsvolumen zu berechnen.
            </Typography>
            <LazyLoad>
              <FurnitureCalculator />
            </LazyLoad>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box>
        <OrderField
          label="Nachricht an uns"
          path="text"
          multiline
          placeholder="sollten wir noch etwas wissen..."
        />
      </Box>

      <Box
        display="flex"
        gap={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <DataPrivacyCheck />
        <SendButton src="UmzugRuckZuck" />
      </Box>
    </ContainerBox>
  );
}
