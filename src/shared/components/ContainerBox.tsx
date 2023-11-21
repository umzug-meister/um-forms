import { Box } from "@mui/material";
import React from "react";

export default function ContainerBox({ children }: React.PropsWithChildren) {
  return (
    <Box
      display="flex"
      m="auto"
      flexDirection="column"
      gap={4}
      p={2}
      sx={{
        maxWidth: "800px",
      }}
    >
      {children}
    </Box>
  );
}
