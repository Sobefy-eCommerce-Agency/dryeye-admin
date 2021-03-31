import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import useGeolocation from "../../hooks/useGeolocation";
import { googleApiKey } from "../../shared/environment";

const Locator = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
  });
  const [loading, location] = useGeolocation();
  const [center, setCenter] = useState({ lat: 37.09024, lng: -95.712891 });
  const [zoom, setZoom] = useState(3);

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
      setZoom(10);
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
              zoom={zoom}
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
