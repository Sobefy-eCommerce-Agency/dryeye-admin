import { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { useLocator } from "../context/locatorContext";
import useGeolocation from "../../hooks/useGeolocation";
import { googleApiKey } from "../../shared/environment";
import { PracticesApi } from "../../configuration/axiosInstances";
import LocatorMarker from "./locatorMarker";
import { Practice } from "../../types/interfaces/practices";
import LocatorInfoWindow from "./locatorInfoWindow";
import LocatorCard from "./locatorCard";

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

  return (
    <Box width="full" height="100vh">
      <Box></Box>
      <SimpleGrid height="full" templateColumns="1fr 2fr">
        <SimpleGrid
          columns={1}
          rowGap={5}
          overflowY="auto"
          background="gray.50"
          py={5}
        >
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
            : null}
        </SimpleGrid>
        <Box>
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
    </Box>
  );
};

export default Locator;
