import { Divider, Typography } from "@mui/material";
import React from "react";
import { ColFlexBox } from "../../shared/components/ColFlexBox";

interface Props {
  title?: string;
}

export default function ContainerBox({
  children,
  title,
}: React.PropsWithChildren<Readonly<Props>>) {
  return (
    <ColFlexBox gap={4}>
      {title && (
        <>
          <Typography variant="h4" color="primary" align="center">
            {title}
          </Typography>

          <Divider />
        </>
      )}
      {children}
    </ColFlexBox>
  );
}
