import { useEffect, useState } from "react";
import { Practice } from "../../types/interfaces/practices";
import { useLocator } from "../context/locatorContext";
import Header from "./Header/Header";
import Locations from "./Locations/Locations";
import Map from "./Map/Map";
import {
  PracticeAttributesApi,
  DoctorsApi,
} from "../../configuration/axiosInstances";
import { Box } from "@chakra-ui/react";

const Locator = () => {
  const { dispatch } = useLocator();
  const [treatmentsAndServices, setTreatmentsAndServices] = useState<
    any[] | null
  >(null);
  const [myDoctors, setMyDoctors] = useState<any[] | null>(null);

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

  const navigateToLocation = (id: string) => {
    if (window.self !== window.top) {
      window.parent.location.href = `https://store.dryeyerescue.com/pages/practice/${id}`;
    } else {
      window.location.href = `https://store.dryeyerescue.com/pages/practice/${id}`;
    }
  };

  // Side effects
  useEffect(() => {
    PracticeAttributesApi.get().then((response) => {
      const { data } = response;
      if (data) {
        setTreatmentsAndServices(data);
      }
    });
    DoctorsApi.get().then((response) => {
      const { data } = response;
      if (data) {
        setMyDoctors(data);
      }
    });
  }, []);

  return (
    <Box>
      <Header />
      <Map
        handleActivateLocation={activateLocation}
        treatmentsAndServices={treatmentsAndServices}
        myDoctors={myDoctors}
      />
      <Locations
        treatmentsAndServices={treatmentsAndServices}
        navigateToLocation={navigateToLocation}
      />
    </Box>
  );
};

export default Locator;
