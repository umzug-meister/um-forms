import { MainApp } from "../shared/MainApp";
import { AppRoutes } from "./app-routes";

export default function App() {
  return (
    <MainApp full>
      <AppRoutes />
    </MainApp>
  );
}
