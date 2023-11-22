import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyLoad } from "../../../shared/components/LazyLoad";

const Inputs = lazy(() => import("./Inputs"));
const Main = lazy(() => import("./Main"));
const Success = lazy(() => import("./../../../shared/routes/Success"));

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
      <Route
        path="success/:id"
        element={
          <LazyLoad>
            <Success />
          </LazyLoad>
        }
      />
    </Routes>
  );
}
