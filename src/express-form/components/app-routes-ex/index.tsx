import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyLoad } from "../../../shared/components/LazyLoad";

const Inputs = lazy(() => import("./Inputs"));
const Main = lazy(() => import("./Main"));

export default function AppRoutesEx() {
  return (
    <Routes>
      <Route
        index
        element={
          <LazyLoad>
            <Main />
          </LazyLoad>
        }
      />
      <Route
        path="inputs"
        element={
          <LazyLoad>
            <Inputs />
          </LazyLoad>
        }
      />
    </Routes>
  );
}
