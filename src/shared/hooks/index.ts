import { useSelector } from "react-redux";
import { Order } from "um-types";
import { AppState } from "../../store";
import { AppOptions } from "../../store/appReducer";

export type Path = keyof Order;
export type NestedPath<T> = keyof T;

export function useOption(name: string) {
  const options = useSelector<AppState, AppOptions>((s) => s.app.options);
  const value = options[name];
  return value;
}

export function useOrderValue<T>(path: Path, nestedPath?: NestedPath<T>) {
  const order = useSelector<AppState, Order>((s) => s.app.current!);

  let value = order[path];
  if (nestedPath && typeof value === "object") {
    //@ts-ignore
    value = value[nestedPath];
  }
  return value || "";
}
