import { Input } from "@chakra-ui/input";
import { Box, StackDivider, Text, VStack } from "@chakra-ui/layout";
import { FieldProps } from "formik";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import { AddressComponent } from "../../types/interfaces/practices";
import { GetAddressComponentValue } from "../utils/format";

interface AddressAutocompleteProps {
  placeholder: string;
  id: string;
  onSelect: React.Dispatch<React.SetStateAction<AddressComponent | null>>;
}

const AddressAutocomplete = ({
  placeholder,
  field,
  id,
  form,
  onSelect,
}: AddressAutocompleteProps & FieldProps) => {
  // Formik fns
  const { setFieldValue, setFieldTouched, validateField } = form;

  const center = { lat: 50.064192, lng: -130.605469 };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "us",
      },
      types: ["address"],
      bounds: {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      },
      origin: center,
    },
    debounce: 0,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setFieldTouched(id);
    setFieldValue(id, e.target.value, true);
    onSelect(null);
  };

  const handleSelect = ({
    description,
    place_id,
  }: {
    description: string;
    place_id: string;
  }) => () => {
    setValue(description, false);
    clearSuggestions();
    getDetails({ placeId: place_id })
      .then((details) => {
        if (typeof details !== "string") {
          const { address_components, geometry } = details;
          if (address_components) {
            const addressComponent: AddressComponent = {
              address: description,
              street_number: GetAddressComponentValue(
                address_components,
                "street_number",
                "short_name"
              ),
              route: GetAddressComponentValue(
                address_components,
                "route",
                "long_name"
              ),
              city: GetAddressComponentValue(
                address_components,
                "locality",
                "long_name"
              ),
              county: GetAddressComponentValue(
                address_components,
                "administrative_area_level_2",
                "long_name"
              ),
              state: GetAddressComponentValue(
                address_components,
                "administrative_area_level_1",
                "long_name"
              ),
              state_short: GetAddressComponentValue(
                address_components,
                "administrative_area_level_1",
                "short_name"
              ),
              country: GetAddressComponentValue(
                address_components,
                "country",
                "long_name"
              ),
              country_short: GetAddressComponentValue(
                address_components,
                "country",
                "short_name"
              ),
              zip: GetAddressComponentValue(
                address_components,
                "postal_code",
                "short_name"
              ),
              latitude: geometry ? geometry.location.lat() : "",
              longitude: geometry ? geometry.location.lng() : "",
            };
            setFieldTouched(id);
            setFieldValue(id, description, true);
            onSelect(addressComponent);
            validateField(id);
          }
        }
      })
      .catch((error) => {});
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Box
          key={place_id}
          onClick={handleSelect(suggestion)}
          width="full"
          background="white"
          _hover={{ color: "brand.primaryLight" }}
        >
          <Text fontSize={14} lineHeight="short">
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </Text>
        </Box>
      );
    });

  return (
    <Box ref={ref}>
      <Input
        {...field}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
      />
      {status === "OK" ? (
        <Box
          position="absolute"
          background="white"
          cursor="pointer"
          zIndex="popover"
          width="full"
          marginTop="4px"
        >
          <VStack
            divider={
              <StackDivider borderColor="gray.200" spacing={4} align="center" />
            }
            width="full"
            p={4}
            borderRadius={4}
            boxShadow="xl"
          >
            {renderSuggestions()}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default AddressAutocomplete;
