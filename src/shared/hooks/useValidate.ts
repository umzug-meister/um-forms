import { useSelector } from "react-redux";
import { Address, Customer, Order } from "um-types";
import { AppState } from "../../store";
import { ValidationError } from "../classes/ValidationError";

type ValidationSchemaRequired<T> = {
  key: keyof T;
  message: string;
  type: "required";
};

type ValidationSchemaRegex<T> = {
  key: keyof T;
  message: string;
  type: "regex";
  regex: RegExp;
};

type ValidationSchema<T> =
  | ValidationSchemaRegex<T>
  | ValidationSchemaRequired<T>;

export function useValidate() {
  const order = useSelector<AppState, Order>((s) => s.app.current);

  const validate = (step: number): boolean => {
    switch (step) {
      case 0:
        validateCustomer(order);
        return validateDate(order);
      case 1:
        return validateFrom(order);
      case 2:
        return validateTo(order);
      default:
        return true;
    }
  };
  return { validate };
}

function validateObject<T>(obj: any, schemas: ValidationSchema<T>[]) {
  schemas.forEach((vs) => {
    const { key, message, type } = vs;
    if (type === "required") {
      if (!obj[key]) {
        missing(message);
      }
    } else {
      const res = vs.regex.test(obj[key]);
      if (!res) {
        throw new ValidationError(message);
      }
    }
  });
  return true;
}

function missing(value: string) {
  throw new ValidationError(
    `Das Feld "${value}" ist erforderlich. Bitte tragen Sie etwas ein.`
  );
}

function validateCustomer(order: Order) {
  const schemas: ValidationSchema<Customer>[] = [
    {
      key: "firstName",
      message: "Vorname",
      type: "required",
    },
    {
      key: "lastName",
      message: "Nachname",
      type: "required",
    },
    {
      key: "email",
      message: "E-Mail",
      type: "required",
    },
    {
      key: "email",
      message: "Die E-Mail Adresse ist ungültig",
      type: "regex",
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
  ];

  return validateObject(order.customer, schemas);
}

function validateDate(order: Order) {
  const schemas: ValidationSchema<Order>[] = order.isDateFix
    ? [{ key: "date", message: "Umzugstermin", type: "required" }]
    : [
        {
          key: "date_from",
          message: "frühester Umzugstermin",
          type: "required",
        },
        { key: "date_to", message: "spätester Umzugstermin", type: "required" },
      ];

  return validateObject(order, schemas);
}

const STREET_REGEX = /.{1,50}\d.{0,5}/g;

function validateFrom(order: Order) {
  const { from } = order;
  const primarySchemas: ValidationSchema<Address>[] = [
    {
      key: "address_street",
      message: "Straße und Hausnummer",
      type: "required",
    },
    {
      key: "address_street",
      message: "Straße und Hausnummer sind unvollständig.",
      type: "regex",
      regex: STREET_REGEX,
    },
    {
      key: "address_zip",
      message: "PLZ",
      type: "required",
    },
    {
      key: "address_city",
      message: "Ort",
      type: "required",
    },
    {
      key: "runningDistance",
      message: "Entfernung vom Parkplatz zur Haustür",
      type: "required",
    },
    {
      key: "movementObject",
      message: "Auszug aus",
      type: "required",
    },
    {
      key: "roomsNumber",
      message: "Anzahl der Zimmer",
      type: "required",
    },
    {
      key: "area",
      message: "Wohnfläche",
      type: "required",
    },
  ];
  validateObject(from, primarySchemas);

  if (from.movementObject !== "Haus") {
    const secondarySchemas: ValidationSchema<Address>[] = [
      {
        key: "floor",
        message: "Stockwerk",
        type: "required",
      },
      {
        key: "liftType",
        message: "Fahrstuhl",
        type: "required",
      },
    ];
    validateObject(from, secondarySchemas);
  }
  return true;
}

function validateTo(order: Order) {
  const { to } = order;

  const primarySchemas: ValidationSchema<Address>[] = [
    {
      key: "address_street",
      message: "Straße und Hausnummer",
      type: "required",
    },
    {
      key: "address_street",
      message: "Straße und Hausnummer sind unvollständig.",
      type: "regex",
      regex: STREET_REGEX,
    },
    {
      key: "address_zip",
      message: "PLZ",
      type: "required",
    },
    {
      key: "address_city",
      message: "Ort",
      type: "required",
    },
    {
      key: "runningDistance",
      message: "Entfernung vom Parkplatz zur Haustür",
      type: "required",
    },
    {
      key: "movementObject",
      message: "Auszug aus",
      type: "required",
    },
  ];
  validateObject(to, primarySchemas);

  if (to.movementObject !== "Haus") {
    const secondarySchemas: ValidationSchema<Address>[] = [
      {
        key: "floor",
        message: "Stockwerk",
        type: "required",
      },
      {
        key: "liftType",
        message: "Fahrstuhl",
        type: "required",
      },
    ];
    validateObject(to, secondarySchemas);
  }
  return true;
}
