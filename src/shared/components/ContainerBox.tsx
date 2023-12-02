import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { ColFlexBox } from "./ColFlexBox";
import { GridContainer } from "./GridContainer";

interface Props {
  title?: string;
}

export default function ContainerBox({
  children,
  title,
}: React.PropsWithChildren<Readonly<Props>>) {
  return (
    <GridContainer>
      <Grid item xs={12}>
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
          <CardContent sx={{ paddingX: 0.5 }}>
            <ColFlexBox gap={4}>{children}</ColFlexBox>
          </CardContent>
        </Card>
      </Grid>
    </GridContainer>
  );
}
