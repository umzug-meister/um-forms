import { SxProps, Theme, TypographyProps } from "@mui/material";

export const movementObjects = ["Wohnung", "Haus", "Keller", "Lager", "Büro"];

export const parkingDistances = [...new Array(10).keys()].map(
  (k) => `${(k + 1) * 10} m.`
);
export const etagen = [
  "UG",
  "EG",
  ...[...new Array(8).keys()].map((k) => `${k + 1}. Etage`),
  "9+ Etage",
];
export const squares = [...new Array(15).keys()].map(
  (k) => `${(k + 1) * 10} m²`
);
export const liftTypes = [
  "kein Aufzug",
  "2 Personen",
  "4 Personen",
  "6 Personen",
  "8+ Personen",
];

export const typoProps: TypographyProps = {
  variant: "h6",
  align: "right",
};

export const rootSX: SxProps<Theme> = {
  margin: "auto",
  maxWidth: "900px",
};
