import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  title?: string;
}

export default function ContainerBox({
  children,
  title,
}: React.PropsWithChildren<Readonly<Props>>) {
  return (
    <Card elevation={0}>
      {title && (
        <>
          <CardHeader
            title={
              <Typography variant="h4" color="primary" align="center">
                {title}
              </Typography>
            }
          />
          <Divider />
        </>
      )}
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
