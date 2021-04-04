import { Marker } from "@react-google-maps/api";
import { Practice } from "../../types/interfaces/practices";
import MarkerIcon from "../../assets/images/location.png";

interface LocatorMarkerProps {
  location: Practice;
  onMarkerClick(location: Practice): void;
}

const LocatorMarker = ({ location, onMarkerClick }: LocatorMarkerProps) => {
  const { latitude, longitude } = location;

  return (
    <>
      {typeof latitude === "number" && typeof longitude === "number" ? (
        <Marker
          position={{ lat: latitude, lng: longitude }}
          onClick={() => onMarkerClick(location)}
          icon={MarkerIcon}
        />
      ) : null}
    </>
  );
};

export default LocatorMarker;
