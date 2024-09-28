import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, OrderSrcType } from "um-types";
import { AppDispatch, AppState } from "../../store";
import { setServiceColli, updateOrderProps } from "../../store/appReducer";
import { useSearchParams } from "react-router-dom";

import Cookies from "js-cookie";

export function useServiceColli(id: string) {
  const order = useSelector<AppState, Order>((s) => s.app.current);

  const dispatch = useDispatch<AppDispatch>();
  const colli = order.services.find((s) => s.id === id)?.colli ?? "";

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

  useEffect(() => {
    let src = undefined;
    src = searchParams.get("src") as OrderSrcType;

    if (src) {
      Cookies.set("src", src, { expires: 7, path: "" });
    } else {
      src = Cookies.get("src");
    }
    console.log(src);
    dispatch(updateOrderProps({ path: ["src"], value: src }));
  }, [searchParams]);
}
