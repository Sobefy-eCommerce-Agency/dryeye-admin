import { Center } from "../types/commons/commons";
import { Practice } from "../types/interfaces/practices";

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
  radius: string,
  location: Center,
  locationToCompare: Center
) => {
  const radiusInMeters = getMeters(Number(radius));
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

    if (distanceBetweenLocations <= radiusInMeters) {
      return true;
    }
  }
  return false;
};

export const toBase64 = (file: File) =>
  new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
