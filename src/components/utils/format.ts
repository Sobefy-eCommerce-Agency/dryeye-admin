import {
  addressComponentField,
  addressComponentNameLength,
} from "../../types/commons/commons";

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
