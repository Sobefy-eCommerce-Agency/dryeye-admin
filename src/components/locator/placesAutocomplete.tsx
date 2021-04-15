import {
  Input,
  Box,
  StackDivider,
  Text,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import { Center } from "../../types/commons/commons";

interface PlacesAutocompleteProps {
  label: string;
  id: string;
  placeholder: string;
  onSelect(center: Center | null): void;
}

const PlacesAutocomplete = ({
  label,
  id,
  placeholder,
  onSelect,
}: PlacesAutocompleteProps) => {
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
        country: ["us", "ca"],
      },
      types: ["(cities)"],
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
          const { geometry } = details;
          if (geometry) {
            const { location } = geometry;
            const center: Center = {
              lat: location.lat(),
              lng: location.lng(),
            };
            onSelect(center);
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
    <Box ref={ref} position="relative">
      <FormLabel htmlFor={id} fontSize={12} fontWeight="normal">
        {label}
      </FormLabel>
      <Input
        id={id}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
        background="white"
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

export default PlacesAutocomplete;
