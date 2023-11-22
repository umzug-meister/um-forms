import { Suspense } from "react";
import { LoadingScreen } from "./LoadingScreen";

export function LazyLoad({ children }: React.PropsWithChildren) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}
