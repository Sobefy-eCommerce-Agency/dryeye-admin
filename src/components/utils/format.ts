import {
  addressComponentField,
  addressComponentNameLength,
  SelectAutocompleteList,
} from "../../types/commons/commons";
import { Customer } from "../../types/interfaces/customers";
import { Practice } from "../../types/interfaces/practices";

export const GetAddressComponentValue = (
  components: google.maps.GeocoderAddressComponent[],
  type: addressComponentField,
  length: addressComponentNameLength
) => {
  const filteredComponent = components.filter((el) => el.types[0] === type);
  const result =
    filteredComponent.length === 1 ? filteredComponent[0][length] : "";
  return result;
};

export const FormatSelectAutocompleteData = (
  data: [],
  list: SelectAutocompleteList
) => {
  switch (list) {
    case "customers":
      return data.flatMap((el: Customer) => {
        if (el.doctor && el.first_name) {
          return {
            id: el.doctor,
            label: `${el.first_name} ${el.last_name}`,
          };
        }
        return [];
      });
    case "practices":
      return data.flatMap((el: Practice) => {
        if (el.practice && el.name) {
          return {
            id: el.practice,
            label: el.name,
          };
        }
        return [];
      });
  }
};
