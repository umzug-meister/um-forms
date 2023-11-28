import { useDispatch, useSelector } from "react-redux";
import { Order, Furniture, Category } from "um-types";
import { AppDispatch, AppState } from "../../store";
import { AppOptions } from "../../store/appReducer";

export type Path = keyof Order;
export type NestedPath<T> = keyof T;

export function useOption(name: string) {
  const options = useSelector<AppState, AppOptions>((s) => s.app.options);
  const value = options[name];
  return value;
}

export function useOrderValue<T>(path: Path, nestedPath?: NestedPath<T>) {
  const order = useSelector<AppState, Order>((s) => s.app.current);

  let value = order[path];
  if (nestedPath && typeof value === "object") {
    //@ts-ignore
    value = value[nestedPath];
  }
  return value || "";
}

export function useAppFurniture() {
  const furniture = useSelector<AppState, Furniture[]>((s) => s.app.furniture);

  const sorted = [...furniture].sort(
    (a, b) => Number(a.sortOrder || 1000) - Number(b.sortOrder || 1000)
  );
  return sorted;
}

export function useCategories() {
  const categories = useSelector<AppState, Category[]>((s) => s.app.categories);
  return categories;
}

export function useFurnitureValue(
  furnitureId: string,
  selectedCategory: string
) {
  const items = useSelector<AppState, Furniture[]>(
    (state) => state.app.current.items
  );

  return items?.find(
    (item) =>
      item.id === furnitureId && item.selectedCategory === selectedCategory
  )?.colli;
}
