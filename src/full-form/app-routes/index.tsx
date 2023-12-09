import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyLoad } from "../../shared/components/LazyLoad";

const Contact = lazy(() => import("./Contact"));
const Auszug = lazy(() => import("./Auszug"));
const Einzug = lazy(() => import("./Einzug"));
const Verpackung = lazy(() => import("./Verpackung"));
const Main = lazy(() => import("./Main"));
const Request = lazy(() => import("./Request"));

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LazyLoad>
            <Main />
          </LazyLoad>
        }
      >
        <Route
          index
          element={
            <LazyLoad>
              <Contact />
            </LazyLoad>
          }
        />
        <Route
          path="auszug"
          element={
            <LazyLoad>
              <Auszug />
            </LazyLoad>
          }
        />
        <Route
          path="einzug"
          element={
            <LazyLoad>
              <Einzug />
            </LazyLoad>
          }
        />
        <Route
          path="verpackung"
          element={
            <LazyLoad>
              <Verpackung />
            </LazyLoad>
          }
        />
        <Route
          path="absenden"
          element={
            <LazyLoad>
              <Request />
            </LazyLoad>
          }
        />
      </Route>
    </Routes>
  );
}
