import { Marker } from "@react-google-maps/api";
import { Practice } from "../../../../types/interfaces/practices";
import MarkerIcon from "../../../../assets/icons/marker.svg";

interface LocatorMarkerProps {
  location: Practice;
  onClick(location: Practice): void;
}

const LocatorMarker = ({ location, onClick }: LocatorMarkerProps) => {
  const { latitude, longitude } = location;

  return (
    <>
      {latitude && longitude ? (
        <Marker
          position={{ lat: latitude, lng: longitude }}
          onClick={() => onClick(location)}
          icon={MarkerIcon}
        />
      ) : null}
    </>
  );
};

export default LocatorMarker;
