import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import useGeolocation from "../../hooks/useGeolocation";

const Locator = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCHeK_iAMVafmWm_6D0LX7K1ITSrAVnFr8",
  });
  const [loading, location] = useGeolocation();
  const [center, setCenter] = useState({ lat: 26.3728124, lng: -80.1874058 });

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
      setCenter({ lat: location.latitude, lng: location.longitude });
    }
  }, [location]);

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
              zoom={10}
              options={mapOptions}
            >
              <></>
            </GoogleMap>
          ) : null}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Locator;
