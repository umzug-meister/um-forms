import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Category, Furniture, Order } from "@umzug-meister/um-core";
import { AppDispatch, AppState } from "../../store";
import { updateOrderProps } from "../../store/appReducer";

export type Path = keyof Order;
export type NestedPath<T> = keyof T;

export function useOrderValue<T>(path: Path, nestedPath?: NestedPath<T>) {
  const order = useSelector<AppState, Order>((s) => s.app.current);

  const dispatch = useDispatch<AppDispatch>();
  const setValue = useCallback((value: any) => {
    const propPath: string[] = [path];
    if (nestedPath) {
      propPath.push(String(nestedPath));
    }
    dispatch(updateOrderProps({ path: propPath, value }));
  }, []);
  let value = order[path];
  if (nestedPath && typeof value === "object") {
    //@ts-ignore
    value = value[nestedPath];
  }
  return { value: value || "", setValue };
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
  return [...categories].sort((a, b) => b.name.localeCompare(a.name));
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
