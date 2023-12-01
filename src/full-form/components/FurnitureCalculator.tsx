import { Alert, Box, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Category, Furniture } from "um-types";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import { GridContainer } from "../../shared/components/GridContainer";
import { typoProps } from "../../shared/constants";
import {
  useAppFurniture,
  useCategories,
  useFurnitureValue,
  useOption,
  useOrderValue,
} from "../../shared/hooks";
import { AppDispatch } from "../../store";
import { setFurniture } from "../../store/appReducer";
import { NumberInput } from "./NumberInput";

export default function FurnitureCalculator() {
  const categories = useCategories();

  const sorted = [...categories];
  sorted.sort((a, b) => a.sort - b.sort);

  return (
    <ColFlexBox gap={4}>
      <ColFlexBox>
        <Typography {...typoProps}>Kartons</Typography>

        <Boxes />
      </ColFlexBox>

      {sorted.map((cat) => (
        <CategoryRenderer key={cat.id} category={cat} />
      ))}

      <OrderVolume />
    </ColFlexBox>
  );
}

interface CategoryRendererProps {
  category: Category;
}

function inCategory(f: Furniture, category: Category) {
  return f.categoryRefs.some((c) => c.id === category.id);
}

function CategoryRenderer({ category }: Readonly<CategoryRendererProps>) {
  const furniture = useAppFurniture();
  const filtered = furniture.filter((f) => inCategory(f, category));

  return (
    <ColFlexBox>
      <Typography {...typoProps}>{category.name}</Typography>
      <GridContainer spacing={4} alignItems="flex-end">
        {filtered.map((f) => (
          <FurnitureRenderer
            key={f.id}
            selectedCategory={category.name}
            furniture={f}
          />
        ))}
      </GridContainer>
    </ColFlexBox>
  );
}

interface FunitureRenderProps {
  selectedCategory: string;
  furniture: Furniture;
}

function FurnitureRenderer({
  furniture,
  selectedCategory,
}: Readonly<FunitureRenderProps>) {
  const value = useFurnitureValue(furniture.id, selectedCategory);

  const dispatch = useDispatch<AppDispatch>();
  const onChange = (colli: any) => {
    dispatch(
      setFurniture({
        furniture: { ...furniture, selectedCategory, colli },
      })
    );
  };

  return (
    <Grid item xs={12} sm={6}>
      <NumberInput
        label={furniture.name}
        step={furniture.step}
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
}

function Boxes() {
  const { value: boxNumber, setValue: setBoxnumber } =
    useOrderValue("boxNumber");
  const { value: kleiderboxNumber, setValue: setkleiderboxNumber } =
    useOrderValue("kleiderboxNumber");

  const href = useOption("boxCalculatorUrl");

  return (
    <ColFlexBox>
      <GridContainer spacing={4} alignItems="flex-end">
        <Grid item xs={12}>
          <Alert severity="info">
            Nutzen sie unseren{" "}
            <a target={"_blank"} href={href}>
              Kartonrechner
            </a>
            , um die Anzahl der benötigten Kartons zu ermitteln.
            <p>
              Möchten Sie sicherstellen, dass Ihre Kleidung knitterfrei
              transportiert wird? Dann benötigen Sie pro 50 cm
              Kleiderstangenbreite eine Kleiderbox.
            </p>
          </Alert>
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberInput
            label="Umzugskartons"
            //@ts-ignore
            value={boxNumber}
            onChange={setBoxnumber}
            step={1}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberInput
            label="Kleiderboxen"
            //@ts-ignore
            value={kleiderboxNumber}
            onChange={setkleiderboxNumber}
            step={1}
          />
        </Grid>
      </GridContainer>
    </ColFlexBox>
  );
}

function OrderVolume() {
  const { value } = useOrderValue("volume");

  const formatter = new Intl.NumberFormat("de-DE");
  return <Alert>Umzugsvolumen: {formatter.format(Number(value))} m³</Alert>;
}
