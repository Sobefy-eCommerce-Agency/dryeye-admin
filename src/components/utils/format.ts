import {
  addressComponentField,
  addressComponentNameLength,
  SelectAutocompleteList,
} from "../../types/commons/commons";
import { Customer } from "../../types/interfaces/customers";
import { Doctors } from "../../types/interfaces/doctors";

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
  data: Customer[],
  list: SelectAutocompleteList
) => {
  switch (list) {
    case "customers":
      const filteredData = data.flatMap((el) => {
        if (el.doctor && el.first_name) {
          return {
            id: el.doctor,
            label: `${el.first_name} ${el.last_name}`,
          };
        }
        return [];
      });
      return filteredData;
  }
};
