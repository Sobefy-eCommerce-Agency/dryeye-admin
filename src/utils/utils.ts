import { Center } from "../types/commons/commons";
import { Practice } from "../types/interfaces/practices";

export const checkForValidRoute = (route: string) => {
  const validRoutes = ["/locator", "/locator-new"];
  return validRoutes.includes(route);
};

export const sortByBooleanProperty = (
  practices: Practice[],
  property: "providerPlus" | "provider" | "partner"
) => {
  const sortedArray = practices.sort((x, y) => {
    const xValue = x[property] ? true : false;
    const yValue = y[property] ? true : false;
    if (xValue === true && yValue === false) {
      return -1;
    }
    if (
      (xValue === false && yValue === false) ||
      (xValue === false && yValue === true)
    ) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
};

export const getMeters = (i: number) => {
  return i * 1609.344;
};

export const isLocationInsideRadius = (
  location: Center,
  locationToCompare: Center
) => {
  const radius = getMeters(200);
  const formattedCenter = new window.google.maps.LatLng(
    location.lat,
    location.lng
  );
  const locationFormattedCenter = new window.google.maps.LatLng(
    locationToCompare.lat,
    locationToCompare.lng
  );
  if (locationFormattedCenter) {
    const distanceBetweenLocations =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        formattedCenter,
        locationFormattedCenter
      );

    if (distanceBetweenLocations <= radius) {
      return true;
    }
  }
  return false;
};
