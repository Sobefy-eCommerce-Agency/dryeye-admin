import { useCallback, useRef } from "react";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Card from "./Card/Card";
import SkeletonCard from "../../Skeleton/SkeletonCard";
import { useLocator } from "../../context/locatorContext";
import { Practice } from "../../../types/interfaces/practices";

interface LocationsProps {
  handleActivateLocation(location: Practice | null): void;
}

const Locations = ({ handleActivateLocation }: LocationsProps) => {
  const { state, dispatch } = useLocator();
  const cardWrapperRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(
    null
  );

  const activeCardRef = useCallback((node: HTMLDivElement) => {
    if (node !== null && cardWrapperRef.current !== null) {
      cardWrapperRef.current.scrollTop = node.offsetTop;
    }
  }, []);

  // State
  const {
    center,
    zoom,
    locations,
    filteredLocations,
    activeLocation,
    dryEyeTreatmentsFilter,
    eyeCareServicesFilter,
    dryEyeProductsFilter,
    practiceNameFilter,
    doctorsFilter,
    noResultsFound,
  } = state;
  const currentLocations = filteredLocations || locations;

  const resetFilters = () => {
    dispatch({
      type: "resetFilters",
    });
  };

  // JSX
  const getLocationsList = () => {
    if (noResultsFound) {
      return (
        <Flex
          px={5}
          py={6}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          direction="column"
        >
          <Text mb={6}>No locations found.</Text>
          <Button
            onClick={resetFilters}
            background="brand.secondary"
            color="white"
          >
            Reset filters
          </Button>
        </Flex>
      );
    }
    if (currentLocations) {
      const currentLocationsList = currentLocations.map((loc) => {
        const isActive = activeLocation?.practice === loc.practice;
        const currentRef = isActive ? activeCardRef : null;
        return (
          <Card
            reference={currentRef}
            key={loc.practice}
            location={loc}
            isActive={isActive}
            onClick={(location) => handleActivateLocation(location)}
          />
        );
      });
      return currentLocationsList;
    }
    return [...Array(20)].map((_, i) => <SkeletonCard key={i} />);
  };

  return (
    <Box maxWidth="1480px" margin="auto" position="relative">
      <Box
        background="white"
        position="absolute"
        top={-4}
        zIndex={999}
        p={30}
        borderRadius={6}
        boxShadow="xl"
        width="full"
      >
        <SimpleGrid ref={cardWrapperRef} columns={{ sm: 1, md: 2 }} spacing="8">
          {getLocationsList()}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Locations;
