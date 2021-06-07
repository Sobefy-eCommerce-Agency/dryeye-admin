import { useLocator } from "../components/context/locatorContext";

const useCurrentLocations = () => {
  const { state } = useLocator();
  const { locations, filteredLocations, geoFilteredLocations } = state;
  const geoFilteredLocationsValue = geoFilteredLocations.active
    ? geoFilteredLocations.locations
    : null;
  const filteredLocationsValue = filteredLocations.active
    ? filteredLocations.locations
    : null;
  return geoFilteredLocationsValue || filteredLocationsValue || locations;
};

export default useCurrentLocations;
