import { MainApp } from "../shared/MainApp";
import AppRoutesEx from "./components/app-routes-ex";
import { AppProgress } from "./components/AppProgress";

export function App() {
  return (
    <MainApp>
      <AppProgress />
      <AppRoutesEx />
    </MainApp>
  );
}
