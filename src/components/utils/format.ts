import {
  addressComponentField,
  addressComponentNameLength,
  EntityType,
  SelectAutocompleteList,
} from "../../types/commons/commons";
import { Customer } from "../../types/interfaces/customers";
import { Doctors } from "../../types/interfaces/doctors";
import { Patients } from "../../types/interfaces/patients";
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

export const SearchString = (
  str: string | number | undefined,
  searchTerm: string
) => {
  if (str) {
    const searchTermString = str.toString();
    return searchTermString.toLowerCase().search(searchTerm.toLowerCase());
  }
  return -1;
};

export const SearchByEntity = (
  entity: EntityType,
  data: (Practice | Doctors | Patients)[] | null,
  searchTerm: string
) => {
  if (entity === "practices" && data) {
    const results = data.filter((el) => {
      if (el) {
        const hasName = SearchString(el.name, searchTerm);
        const hasAddress = SearchString(el.address, searchTerm);
        const hasCity = SearchString(el.city, searchTerm);
        const hasState = SearchString(el.state, searchTerm);
        if (
          hasName !== -1 ||
          hasAddress !== -1 ||
          hasCity !== -1 ||
          hasState !== -1
        ) {
          return true;
        }
        return false;
      }
      return false;
    });
    return results;
  }
  if (entity === "doctors" && data) {
    const results = data.filter((el) => {
      if (el) {
        const hasFirstName = SearchString(el.firstName, searchTerm);
        const hasLastName = SearchString(el.lastName, searchTerm);
        const hasPractice = SearchString(el.practice, searchTerm);
        if (hasFirstName !== -1 || hasLastName !== -1 || hasPractice !== -1) {
          return true;
        }
        return false;
      }
      return false;
    });
    return results;
  }
  if (entity === "patients" && data) {
    const results = data.filter((el) => {
      if (el) {
        const hasFirstName = SearchString(el.firstName, searchTerm);
        const hasLastName = SearchString(el.lastName, searchTerm);
        const hasAddress = SearchString(el.address, searchTerm);
        const hasCity = SearchString(el.city, searchTerm);
        const hasState = SearchString(el.state, searchTerm);
        const hasEmail = SearchString(el.email, searchTerm);
        if (
          hasFirstName !== -1 ||
          hasLastName !== -1 ||
          hasAddress !== -1 ||
          hasCity !== -1 ||
          hasState !== -1 ||
          hasEmail !== -1
        ) {
          return true;
        }
        return false;
      }
      return false;
    });
    return results;
  }
  return [];
};
