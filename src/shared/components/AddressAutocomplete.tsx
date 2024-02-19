import { useEffect, useMemo, useRef } from "react";
import { Address } from "um-types";
import { useOption } from "../hooks";
import { GridContainer } from "./GridContainer";
import { GridItem } from "./GridItem";
import OrderField from "./OrderField";

import { Loader } from "@googlemaps/js-api-loader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setAddressParts } from "../../store/appReducer";

interface Props {
  path: "from" | "to";
}

export function AddressAutocomplete({ path }: Readonly<Props>) {
  const gapiKey = useOption("gapikey");

  const dispatch = useDispatch<AppDispatch>();

  const loaderRef = useRef<Loader | null>(null);
  const options: google.maps.places.AutocompleteOptions = useMemo(
    () => ({
      fields: ["address_components"],
      componentRestrictions: { country: ["de", "at", "ch"] },
    }),
    []
  );

  function getByType(
    address_components: google.maps.GeocoderAddressComponent[],
    type: string
  ) {
    const component = address_components.find((ac) => ac.types.includes(type));
    if (component) {
      return component.long_name;
    }
    return undefined;
  }

  const autocompleteID = `${path}-street-address`;

  useEffect(() => {
    if (gapiKey) {
      if (loaderRef.current == null) {
        loaderRef.current = new Loader({
          apiKey: gapiKey,
          language: "de",
        });
      }

      loaderRef.current.importLibrary("places").then((google) => {
        const autocomplete = new google.Autocomplete(
          document.getElementById(autocompleteID) as any,
          options
        );

        autocomplete.addListener("place_changed", () => {
          const { address_components: comps } = autocomplete.getPlace();

          if (comps) {
            const addressParts: Partial<Address> = {};

            const address_city = getByType(comps, "locality");
            const address_street = getByType(comps, "route");
            const address_zip = getByType(comps, "postal_code");
            const address_number = getByType(comps, "street_number");

            if (address_street && address_number) {
              addressParts.address_street = `${address_street} ${address_number}`;
            } else if (address_street) {
              addressParts.address_street = address_street;
            }

            if (address_zip) addressParts.address_zip = address_zip;
            if (address_city) addressParts.address_city = address_city;

            dispatch(setAddressParts({ path, addressParts }));
          }
        });
      });
    }
  }, [gapiKey]);

  return (
    <GridContainer>
      <GridItem>
        <OrderField<Address>
          id={autocompleteID}
          path={path}
          nestedPath="address_street"
          label="Straße und Hausnummer"
          required
        />
      </GridItem>

      <GridItem sm={4}>
        <OrderField<Address>
          id={`${path}-zip`}
          path={path}
          nestedPath="address_zip"
          label="PLZ"
          required
        />
      </GridItem>

      <GridItem sm={8}>
        <OrderField<Address>
          id={`${path}-city`}
          path={path}
          nestedPath="address_city"
          label="Ort"
          required
        />
      </GridItem>
    </GridContainer>
  );
}
