import { useOption } from "../../shared/hooks";
import { AppInfo } from "./AppInfo";

type Props = {
  show: boolean;
};

export function HVZInfo({ show }: Readonly<Props>) {
  const hvzPrice = useOption("hvzPrice");

  const f = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  if (!show) {
    return null;
  }
  return (
    <AppInfo
      text={
        <>
          {`Die Kosten für die Einrichtung einer Halteverbotszone, einschließlich der Beantragung beim KVR, der Aufstellung sowie dem Abbau der Schilder, belaufen sich derzeit auf ${f.format(
            Number(hvzPrice)
          )}.`}
        </>
      }
    />
  );
}
