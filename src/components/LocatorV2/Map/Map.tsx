import { useEffect } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { googleApiKey } from "../../../shared/environment";
import useGeolocation from "../../../hooks/useGeolocation";
import { PracticesApi } from "../../../configuration/axiosInstances";
import { useLocator } from "../../context/locatorContext";
import LocatorMarker from "./Marker/Marker";
import { Practice } from "../../../types/interfaces/practices";
import Filter from "./Filter/Filter";

interface MapProps {
  handleActivateLocation(location: Practice | null): void;
}

const Map = ({ handleActivateLocation }: MapProps) => {
  const { state, dispatch } = useLocator();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
  });
  const [loading, location] = useGeolocation();

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

  // Side effects
  useEffect(() => {
    PracticesApi.get(undefined, true).then((response) => {
      const { data } = response;
      if (data) {
        dispatch({
          type: "setLocations",
          locations: data,
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (location) {
      dispatch({
        type: "setCenter",
        center: { lat: location.latitude, lng: location.longitude },
      });
      dispatch({
        type: "setZoom",
        zoom: 10,
      });
    }
  }, [location, dispatch]);

  // Options
  const mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
  };

  // Styles
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <Box>
      <Box maxWidth="1480px" margin="auto" position="relative">
        <Box
          background="white"
          position="absolute"
          top={4}
          zIndex={999}
          p={30}
          borderRadius={6}
          boxShadow="xl"
          display="grid"
          gridTemplateColumns="repeat(6, 1fr)"
          gridColumnGap={2}
        >
          <Filter placeholder="Practice Name" />
          <Filter placeholder="Doctor Name" />
          <Filter placeholder="Location" />
          <Filter placeholder="Products" />
          <Filter placeholder="DryEye Treatments" />
          <Filter placeholder="Eyecare Services" />
        </Box>
      </Box>
      <Box width="full" height={600}>
        {isLoaded && !loading && currentLocations ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoom}
            options={mapOptions}
          >
            {currentLocations
              ? currentLocations.map((loc) => (
                  <LocatorMarker
                    key={loc.practice}
                    location={loc}
                    onClick={(location: Practice) =>
                      handleActivateLocation(location)
                    }
                  />
                ))
              : null}
          </GoogleMap>
        ) : (
          <Center background="brand.grey.light" width="full" height="full">
            <Spinner size="xl" />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default Map;
