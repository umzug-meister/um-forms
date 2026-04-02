import { Order } from "@umzug-meister/um-core";

export function suggestVisitAppointment(order: Order): boolean {
  if (order.from?.movementObject === "Haus") {
    return true;
  }

  if (order.from?.roomsNumber && Number(order.from.roomsNumber) >= 4) {
    return true;
  }

  return false;
}
