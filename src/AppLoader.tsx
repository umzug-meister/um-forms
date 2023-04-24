import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { loadAllOptions, loadAllServices } from "./store/appReducer";

export default function AppLoader({ children }: React.PropsWithChildren) {
  const [init, setInit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Promise.all([dispatch(loadAllOptions()), dispatch(loadAllServices())]).then(
      () => {
        setInit(true);
      }
    );
  }, []);

  if (init) {
    return <>{children}</>;
  }
  return null;
}
