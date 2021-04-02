import { useEffect } from "react";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { useLocator } from "../context/locatorContext";
import useGeolocation from "../../hooks/useGeolocation";
import { googleApiKey } from "../../shared/environment";
import { PracticesApi } from "../../configuration/axiosInstances";
import LocatorMarker from "./locatorMarker";

const Locator = () => {
  const { state, dispatch } = useLocator();
  const { center, zoom, locations } = state;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
  });
  const [loading, location] = useGeolocation();

  const containerStyle = {
    width: "400px",
    height: "400px",
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

  return (
    <Box>
      <Box></Box>
      <SimpleGrid>
        <Box></Box>
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
                    <LocatorMarker location={loc} onMarkerClick={() => {}} />
                  ))
                : null}
            </GoogleMap>
          ) : null}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Locator;
