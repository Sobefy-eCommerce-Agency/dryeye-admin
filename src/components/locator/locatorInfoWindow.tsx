import { Box, Text } from "@chakra-ui/react";
import { InfoWindow } from "@react-google-maps/api";
import { Practice } from "../../types/interfaces/practices";

interface LocatorInfoWindowProps {
  location: Practice | null;
  onCloseClick(): void;
}

const LocatorInfoWindow = ({
  location,
  onCloseClick,
}: LocatorInfoWindowProps) => {
  if (location) {
    const { name, latitude, longitude } = location;
    console.log(latitude, longitude);
    if (typeof latitude === "number" && typeof longitude === "number") {
      return (
        <InfoWindow
          position={{ lat: latitude, lng: longitude }}
          onCloseClick={onCloseClick}
        >
          <Box width="200px">
            <Text variant="">{name}</Text>
          </Box>
        </InfoWindow>
      );
    }
    return null;
  }
  return null;
};

export default LocatorInfoWindow;
