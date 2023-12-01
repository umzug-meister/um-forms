import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { scrollToRoot } from "../../main.full";
import ContainerBox from "../../shared/components/ContainerBox";
import { DataPrivacyCheck } from "../../shared/components/DataPrivacyCheck";
import OrderField from "../../shared/components/OrderField";
import { SendButton } from "../../shared/SendButton";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { LazyLoad } from "../../shared/components/LazyLoad";
import { lazy } from "react";

const FurnitureCalculator = lazy(
  () => import("../components/FurnitureCalculator")
);
const ImageUploader = lazy(() => import("../components/ImageUploader"));

export default function Request() {
  return (
    <ContainerBox title="Auftrag absenden">
      <Box>
        <Alert severity="info">
          Wir möchten Sie darauf hinweisen, dass eine genaue Bestimmung des
          Umzugsguts ohne eine detaillierte Liste Ihrer Möbel nur eingeschränkt
          möglich ist.
          <p>
            Um Ihnen ein <strong>präziseres Angebot</strong> erstellen zu
            können, benötigen wir weitere Informationen zu Ihren Möbeln.
          </p>
          Hierbei stehen Ihnen folgende Möglichkeiten zur Verfügung:
          <ul>
            <li>Bilder anhängen</li>
            <li>Umzugsvolumen berechnen</li>
          </ul>
        </Alert>
      </Box>

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
        <SendButton scrollToRoot={scrollToRoot} src="UmzugRuckZuck" />
      </Box>
    </ContainerBox>
  );
}
