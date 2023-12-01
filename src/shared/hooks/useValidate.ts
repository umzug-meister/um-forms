import { useSelector } from "react-redux";
import { Order } from "um-types";
import { AppState } from "../../store";
import { ValidationError } from "../classes/ValidationError";

export function useValidate() {
  const order = useSelector<AppState, Order>((s) => s.app.current);

  const validate = (step: number) => {
    switch (step) {
      case 0:
        return validateCustomer(order);
      case 1:
        return validateFrom(order);
      case 2:
        return validateFrom(order);
      default:
        return true;
    }
  };
  return { validate };
}

function missing(value: string) {
  throw new ValidationError(
    `Das Feld "${value}" ist erforderlich. Bitte tragen Sie etwas ein.`
  );
}

function validateCustomer(order: Order) {
  const {
    customer: { firstName, lastName, email },
  } = order;
  if (!firstName) {
    missing("Vorname");
  }
  if (!lastName) {
    missing("Nachname");
  }
  if (!email) {
    missing("E-Mail");
  }
  if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    throw new ValidationError("Die E-Mail Adresse ist ungültig");
  }
  return validateDate(order);
}

function validateDate(order: Order) {
  const now = new Date();

  if (order.isDateFix) {
    if (!order.date) {
      missing("Umzugstermin");
    }
  } else {
    if (!order.date_from) {
      missing("frühester Umzugstermin");
    }
    if (!order.date_to) {
      missing("spätester Umzugstermin");
    }
  }
  return true;
}

function validateFrom(order: Order) {
  const {
    from: { address, runningDistance, movementObject },
  } = order;
  return true;
}
