import { useEffect, useState } from "react";
import { Practice } from "../../types/interfaces/practices";
import { useLocator } from "../context/locatorContext";
import Header from "./Header/Header";
import Locations from "./Locations/Locations";
import Map from "./Map/Map";
import { ServicesAndTreatmentsApi } from "../../configuration/axiosInstances";

const Locator = () => {
  const { dispatch } = useLocator();
  const [treatmentsAndServices, setTreatmentsAndServices] =
    useState<any[] | null>(null);

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
    ServicesAndTreatmentsApi.get().then((response) => {
      const { data } = response;
      if (data) {
        setTreatmentsAndServices(data);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <Map
        handleActivateLocation={activateLocation}
        treatmentsAndServices={treatmentsAndServices}
      />
      <Locations
        handleActivateLocation={activateLocation}
        treatmentsAndServices={treatmentsAndServices}
      />
    </div>
  );
};

export default Locator;
