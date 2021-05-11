import { Practice } from "../../types/interfaces/practices";
import { useLocator } from "../context/locatorContext";
import Header from "./Header/Header";
import Locations from "./Locations/Locations";
import Map from "./Map/Map";

const Locator = () => {
  const { dispatch } = useLocator();

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
    <div>
      <Header />
      <Map handleActivateLocation={activateLocation} />
      <Locations handleActivateLocation={activateLocation} />
    </div>
  );
};

export default Locator;
