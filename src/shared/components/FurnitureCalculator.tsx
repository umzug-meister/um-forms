import { Alert, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Category, Furniture } from "@umzug-meister/um-core";
import { ColFlexBox } from "./ColFlexBox";
import { GridContainer } from "./GridContainer";
import { typoProps } from "../constants";
import {
  useAppFurniture,
  useCategories,
  useFurnitureValue,
  useOrderValue,
} from "../hooks";
import { AppDispatch } from "../../store";
import { setFurniture } from "../../store/appReducer";
import { AppInfo } from "../../full-form/components/AppInfo";
import { NumberInput } from "../../full-form/components/NumberInput";
import { useOption } from "../hooks/useOption";

export default function FurnitureCalculator() {
  const categories = useCategories();

  return (
    <ColFlexBox gap={4}>
      <ColFlexBox>
        <Typography {...typoProps}>Kartons</Typography>

        <Boxes />
      </ColFlexBox>

      {categories.map((cat) => (
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

  if (filtered.length === 0) {
    return null;
  }
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
          <AppInfo
            text={
              <>
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
              </>
            }
          />
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
