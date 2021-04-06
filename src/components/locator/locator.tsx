import { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { useLocator } from "../context/locatorContext";
import useGeolocation from "../../hooks/useGeolocation";
import { googleApiKey } from "../../shared/environment";
import { PracticesApi } from "../../configuration/axiosInstances";
import LocatorMarker from "./locatorMarker";
import { Practice } from "../../types/interfaces/practices";
import LocatorInfoWindow from "./locatorInfoWindow";
import LocatorCard from "./locatorCard";
import { dryEyeTreatments, eyeCareServices } from "../../shared/consts";
import MultiSelect from "../multiSelect/multiSelect";
import SkeletonCard from "../skeleton/skeletonCard";

const Locator = () => {
  const { state, dispatch } = useLocator();
  const { center, zoom, locations, activeLocation } = state;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
  });
  const [loading, location] = useGeolocation();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
  };

  // Handlers
  const activateLocation = (location: Practice | null) => {
    if (
      location &&
      typeof location.latitude === "number" &&
      typeof location.longitude === "number"
    ) {
      dispatch({
        type: "setCenter",
        center: { lat: location.latitude, lng: location.longitude },
      });
      dispatch({
        type: "setZoom",
        zoom: 15,
      });
    }
    dispatch({
      type: "setActiveLocation",
      location: location,
    });
  };

  // Side effects
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

  useEffect(() => {
    PracticesApi.get().then((response) => {
      const { data } = response;
      if (data) {
        dispatch({
          type: "setLocations",
          locations: data,
        });
      }
    });
  }, [dispatch]);

  return (
    <Flex width="full" height="100vh" direction="column" background="gray.50">
      <SimpleGrid px={5} py={6} columns={4} columnGap={5}>
        <MultiSelect
          id="dry_eye_treatments_select"
          label="DryEye Treatments"
          name="DryEye Treatments"
          placeholder="Select one or multiple treatments"
          options={dryEyeTreatments}
        />
        <MultiSelect
          id="eye_care_services_select"
          label="Eye Care Services"
          name="Eye Care Services"
          placeholder="Select one or multiple services"
          options={eyeCareServices}
        />
        <MultiSelect
          id="dry_eye_products"
          label="Dry Eye Products"
          name="Dry Eye Products"
          placeholder="Select one or multiple products"
          options={eyeCareServices}
        />
      </SimpleGrid>
      <SimpleGrid
        height="full"
        templateColumns="25% 75%"
        overflowY="hidden"
        py={5}
      >
        <SimpleGrid columns={1} rowGap={5} overflowY="auto" height="100%">
          {locations
            ? locations.map((loc) => {
                return (
                  <LocatorCard
                    key={loc.practice}
                    location={loc}
                    activeLocation={activeLocation}
                    onClick={(location) => activateLocation(location)}
                  />
                );
              })
            : [...Array(20)].map(() => <SkeletonCard />)}
        </SimpleGrid>
        <Box mr={5} boxShadow="sm">
          {isLoaded && !loading ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              options={mapOptions}
            >
              {locations
                ? locations.map((loc) => (
                    <LocatorMarker
                      key={loc.practice}
                      location={loc}
                      onMarkerClick={(location: Practice) =>
                        activateLocation(location)
                      }
                    />
                  ))
                : null}
              <LocatorInfoWindow
                location={activeLocation}
                onCloseClick={() => activateLocation(null)}
              />
            </GoogleMap>
          ) : null}
        </Box>
      </SimpleGrid>
    </Flex>
  );
};

export default Locator;
