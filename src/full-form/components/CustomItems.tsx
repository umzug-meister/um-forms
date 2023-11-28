import React from "react";
import { CustomItem } from "um-types";

type CustomItemCol = keyof CustomItem;
interface Props {
  cols: CustomItemCol[];
}


let a:Props = { cols: ["name",  ]}
export function CustomItems() {
  return <div>CustomItems</div>;
}
