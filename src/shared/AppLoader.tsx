import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  loadAllCategories,
  loadAllFurniture,
  loadAllServices,
} from "../store/appReducer";
import { useOption } from "./hooks/useOption";

interface Props {
  full?: boolean;
}

export default function AppLoader({
  children,
  full,
}: React.PropsWithChildren<Props>) {
  const [init, setInit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // preload options, since they are not used directly
  useOption("boxCbm");
  useOption("kleiderboxCbm");

  useEffect(() => {
    Promise.all([
      full ? dispatch(loadAllFurniture()) : () => Promise.resolve(),
      full ? dispatch(loadAllCategories()) : () => Promise.resolve(),
      dispatch(loadAllServices()),
    ]).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return <>{children}</>;
  }
  return null;
}
