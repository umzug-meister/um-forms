import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  loadAllCategories,
  loadAllFurniture,
  loadAllOptions,
  loadAllServices,
} from "../store/appReducer";

interface Props {
  full?: boolean;
}

export default function AppLoader({
  children,
  full,
}: React.PropsWithChildren<Props>) {
  const [init, setInit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Promise.all([
      full ? dispatch(loadAllFurniture()) : () => Promise.resolve(),
      full ? dispatch(loadAllCategories()) : () => Promise.resolve(),
      dispatch(loadAllOptions()),
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
