import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Category, Furniture, Order } from "um-types";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import { GridContainer } from "../../shared/components/GridContainer";
import { typoProps } from "../../shared/constants";
import {
  useAppFurniture,
  useCategories,
  useFurnitureValue,
} from "../../shared/hooks";
import { AppDispatch, AppState } from "../../store";
import { setFurniture } from "../../store/appReducer";
import { NumberInput } from "./NumberInput";

export function FurnitureCalculator() {
  const categories = useCategories();

  const sorted = [...categories];
  sorted.sort((a, b) => a.sort - b.sort);
  return (
    <ColFlexBox gap={4}>
      {sorted.map((cat) => (
        <CategoryRenderer key={cat.id} category={cat} />
      ))}
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

function BoxesBlock() {
  const order = useSelector<AppState, Order>((s) => s.app.current);

  const onChange;

  return (
    <ColFlexBox>
      <GridContainer>
        <Grid item xs={12} sm={6}>
          <NumberInput
            label="Kartons"
            value={order.boxNumber}
            step={1}
          ></NumberInput>
        </Grid>
      </GridContainer>
    </ColFlexBox>
  );
}
