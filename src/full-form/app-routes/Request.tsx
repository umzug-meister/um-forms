import { Alert, Box } from "@mui/material";
import { scrollToRoot } from "../../main.full";
import ContainerBox from "../../shared/components/ContainerBox";
import { DataPrivacyCheck } from "../../shared/components/DataPrivacyCheck";
import OrderField from "../../shared/components/OrderField";
import { SendButton } from "../../shared/SendButton";

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
        </Alert>
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
