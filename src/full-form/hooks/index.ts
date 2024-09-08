import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, OrderSrcType } from "um-types";
import { AppDispatch, AppState } from "../../store";
import { setServiceColli, updateOrderProps } from "../../store/appReducer";
import { useSearchParams } from "react-router-dom";

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

export function useSetSrc() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const src = searchParams.get("src") as OrderSrcType;

  if (src !== null) {
    console.log(src);

    dispatch(updateOrderProps({ path: ["src"], value: src }));
  }
}
