import { Box, Divider, Typography } from "@mui/material";
import { ColFlexBox } from "./ColFlexBox";

export default function SuccessPage() {
  return (
    <ColFlexBox gap={4}>
      <Typography variant="h4" color="primary" align="center">
        Herzlichen Dank für Ihre Kontaktaufnahme!
      </Typography>

      <Divider />

      <Typography variant="body1" align="center">
        Wir haben Ihre Anfrage zum Umzugsservice erfolgreich erhalten und freuen
        uns darauf, Sie bei Ihrem Umzugsprojekt zu unterstützen.
      </Typography>

      <Typography variant="body1" align="center">
        Jemand von uns wird sich in Kürze mit Ihnen in Verbindung setzen, um
        alle notwendigen Details zu besprechen und Ihre Fragen zu beantworten.
      </Typography>

      <Typography variant="body1" align="center">
        Wir verstehen, dass ein Umzug eine wichtige Angelegenheit ist, und
        versprechen Ihnen eine schnelle, effiziente und professionelle
        Abwicklung.
      </Typography>

      <Typography variant="body1" align="center">
        Bei weiteren Fragen oder Anliegen erreichen Sie uns jederzeit unter:
      </Typography>

      <Box textAlign="center">
        <Typography variant="body1">
          Tel.: 089 306 42 972
          <br />
          Tel.: 0176 101 71 990
          <br />
          <Typography
            component="a"
            href="mailto:info@umzugruckzuck24.de"
            color="primary"
          >
            info@umzugruckzuck24.de
          </Typography>
        </Typography>
      </Box>

      <Typography variant="body1" align="center">
        Wir freuen uns darauf, Ihnen einen exzellenten Service zu bieten.
      </Typography>

      <Typography variant="body1" align="center">
        Mit freundlichen Grüßen,
        <br />
        Ihr <strong>Umzug Ruckzuck Team</strong>
      </Typography>
    </ColFlexBox>
  );
}
