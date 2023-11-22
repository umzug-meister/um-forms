import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";

export function MainCard() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const variant = small ? "h6" : "h5";

  return (
    <Grid item xs={12} sm={12} md={8}>
      <Box
        sx={{ backgroundColor: "#ECE8E4", height: "100%" }}
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <Box
          sx={{
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e7e2da",
          }}
        >
          <Typography
            variant={variant}
            sx={{ whiteSpace: "nowrap", color: "#13744d" }}
          >
            Schnell umziehen:
            <strong>{` Expressangebot`}</strong>
          </Typography>
        </Box>
        <Box sx={{ background: "white", height: "4px" }} />
        <Box
          paddingX={2}
          paddingY={3}
          display="flex"
          flexDirection="column"
          gap={5}
        >
          <Box pl={2} sx={{ borderLeft: "4px solid #2ea3f2" }}>
            <Typography>
              <strong>Frühbucherrabatt</strong>
            </Typography>
            <br />
            <Typography>
              Ab 30 Tage -
              <strong style={{ color: "#2792da" }}> 5% Rabatt</strong>
            </Typography>
            <Typography>
              Ab 60 Tage -
              <strong style={{ color: "#2792da" }}> 10% Rabatt</strong>
            </Typography>
          </Box>

          <Box>
            <Typography>
              <strong>Flexibel, schnell und stressfrei</strong> - wählen Sie Ihr
              <strong> Express Umzugsangebot </strong>mit individueller Stunden-
              und Helferzahl.
              <br />
              Holen Sie sich innerhalb von Stunden unser unschlagbares Angebot.
            </Typography>
          </Box>
          <Box>
            <ul>
              <li>
                <Typography>Alle Preise inklusive 19% MwSt.</Typography>
              </li>
              <li>
                <Typography>Umzüge am Samstag - ohne Zuschlag</Typography>
              </li>
              <li>
                <Typography>inkl. Umzugsdecken und Gurte</Typography>
              </li>
              <li>
                <Typography>Versicherungsschutz bis 2.000.000€</Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
