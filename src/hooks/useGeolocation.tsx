import { useEffect, useState } from "react";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const useGeolocation = (): [boolean, GeolocationCoordinates | null] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        setLocation(loc.coords);
        setLoading(false);
      },
      () => {
        setLocation(null);
        setLoading(false);
      },
      options
    );
  }, []);

  return [loading, location];
};

export default useGeolocation;
