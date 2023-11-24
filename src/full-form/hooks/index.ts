import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order } from "um-types";
import { AppDispatch, AppState } from "../../store";
import { setServiceColli } from "../../store/appReducer";

export function useServiceColli(id: string) {
  const order = useSelector<AppState, Order>((s) => s.app.current);

  const dispatch = useDispatch<AppDispatch>();
  const colli = order.services.find((s) => s.id === id)?.colli || "";

  const onColliChange = useCallback(
    (colli: string) => {
      dispatch(setServiceColli({ colli, id }));
    },
    [dispatch]
  );

  return { colli, onColliChange };
}
