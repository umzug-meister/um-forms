import { describe, it, expect } from "vitest"; // Import Vitest functions
import { suggestVisitAppointment } from "./auszugUtils";
import { Order } from "@umzug-meister/um-core";

describe("suggestVisitAppointment", () => {
  it("should return true if movementObject is 'Haus'", () => {
    const order = {
      from: {
        movementObject: "Haus",
      },
    } as Order;
    expect(suggestVisitAppointment(order)).toBe(true);
  });

  it("should return true if roomsNumber is 4 or more", () => {
    const order = {
      from: {
        movementObject: "Haus",
        roomsNumber: "4",
      },
    } as Order;
    expect(suggestVisitAppointment(order)).toBe(true);
  });

  it("should return false if movementObject is not 'Haus' and roomsNumber is less than 4", () => {
    const order: Order = {
      from: {
        movementObject: "Wohnung",
        roomsNumber: "3",
      },
    } as Order;

    expect(suggestVisitAppointment(order)).toBe(false);
  });

  it("should return false if 'from' is undefined", () => {
    const order = {} as Order;
    expect(suggestVisitAppointment(order)).toBe(false);
  });
});
