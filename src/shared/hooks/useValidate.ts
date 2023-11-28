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

function validateCustomer(order: Order) {
  const {
    customer: { firstName, lastName, email },
  } = order;
  if (!firstName) {
    throw new ValidationError("Bitte tragen Sie Ihr Vorname ein");
  }
  if (!lastName) {
    throw new ValidationError("Bitte tragen Sie Ihr Nachname ein");
  }
  if (!email) {
    throw new ValidationError("Bitte tragen Sie Ihr E-Mail Adresse ein");
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    throw new ValidationError("Die E-Mail Adresse ist ungültig");
  }
  return true;
}

function validateFrom(order: Order) {
  return true;
}
