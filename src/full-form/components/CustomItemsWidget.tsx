import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Divider, Grid, IconButton, TextFieldProps } from "@mui/material";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import React, { useState } from "react";
import { CustomItem } from "um-types";
import { AppButton } from "../../shared/components/AppButton";
import { AppTextField } from "../../shared/components/AppTextField";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import { GridContainer } from "../../shared/components/GridContainer";
import { useOrderValue } from "../../shared/hooks";

type RootProps = {
  propName: "bulkyItems" | "heavyItems" | "expensiveItems";
  breite?: true;
  tiefe?: true;
  hoehe?: true;
  weight?: true;
};

export function CustomItemsWidget({
  breite,
  tiefe,
  hoehe,
  weight,
  propName,
}: Readonly<RootProps>) {
  const { value, setValue } = useOrderValue(propName);

  const items = (value as CustomItem[]) || [{ colli: 1 }];

  const onAdd = () => {
    setValue([...items, { colli: 1 } as CustomItem]);
  };

  const onUpdate = (index: number) => {
    return function (item: CustomItem) {
      const next = [...items];
      next.splice(index, 1, item);
      setValue(next);
    };
  };

  const onDelete = (index: number) => {
    return function () {
      const next = [...items];
      next.splice(index, 1);
      setValue(next);
    };
  };

  return (
    <React.Fragment key={items.length}>
      <ColFlexBox>
        {items.map((item, index) => (
          <CustomItemWidgetLine
            key={index}
            onUpdate={onUpdate(index)}
            onDelete={onDelete(index)}
            customItem={item}
            breite={breite}
            hoehe={hoehe}
            tiefe={tiefe}
            weight={weight}
          />
        ))}
      </ColFlexBox>
      <Box display="flex" justifyContent="end">
        <AppButton
          color="info"
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          size="small"
          onClick={onAdd}
        >
          Zeile
        </AppButton>
      </Box>
    </React.Fragment>
  );
}

type Props = Partial<RootProps> & {
  customItem: CustomItem;
  onUpdate: (item: CustomItem) => void;
  onDelete: () => void;
};

function CustomItemWidgetLine({
  customItem,
  breite,
  hoehe,
  tiefe,
  weight,
  onUpdate,
  onDelete,
}: Readonly<Props>) {
  const [item, setItem] = useState(customItem);

  const onChange = (prop: keyof CustomItem) => {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      setItem((cur) => ({ ...cur, [prop]: event.target.value }));
    };
  };
  const getValue = (prop: keyof CustomItem) => item[prop] || "";

  const onBlur = () => {
    onUpdate(item);
  };

  const buildProps = (
    type: React.InputHTMLAttributes<HTMLInputElement>["type"],
    label: string,
    prop: keyof CustomItem
  ): TextFieldProps => {
    return {
      size: "small",
      type,
      label,
      value: getValue(prop),
      onChange: onChange(prop),
      onBlur,
    };
  };

  return (
    <>
      <GridContainer spacing={1} alignItems={"center"}>
        <Grid item xs={2} sm={1}>
          <IconButton color="error" onClick={onDelete}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10} sm={5} md={3}>
          <AppTextField {...buildProps("text", "Bezeichnung", "name")} />
        </Grid>
        {breite && (
          <Grid item xs={4} sm={3} md={2}>
            <AppTextField
              {...buildProps("number", "Breite", "breite")}
              InputProps={{ endAdornment: "cm" }}
            />
          </Grid>
        )}
        {tiefe && (
          <Grid item xs={4} sm={3} md={2}>
            <AppTextField
              {...buildProps("number", "Tiefe", "tiefe")}
              InputProps={{ endAdornment: "cm" }}
            />
          </Grid>
        )}
        {hoehe && (
          <Grid item xs={4} sm={3} md={2}>
            <AppTextField
              {...buildProps("number", "Höhe", "hoehe")}
              InputProps={{ endAdornment: "cm" }}
            />
          </Grid>
        )}
        {weight && (
          <Grid item xs={4} sm={3} md={2}>
            <AppTextField
              {...buildProps("number", "Gewicht", "weight")}
              InputProps={{ endAdornment: "kg" }}
            />
          </Grid>
        )}
        <Grid item xs={4} sm={3} md={2}>
          <AppTextField {...buildProps("number", "Anzahl", "colli")} />
        </Grid>
      </GridContainer>
      <Divider />
    </>
  );
}
