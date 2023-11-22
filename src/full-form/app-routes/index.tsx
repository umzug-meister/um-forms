import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { Success } from "../../shared/routes/Success";

const Contact = lazy(() => import("./Contact"));
const Auszug = lazy(() => import("./Auszug"));
const Einzug = lazy(() => import("./Einzug"));
const Extras = lazy(() => import("./Extras"));
const Main = lazy(() => import("./Main"));
const Request = lazy(() => import("./Request"));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="success/:id" element={<Success />} />
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
              <Extras />
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

function LazyLoad({ children }: React.PropsWithChildren) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}
