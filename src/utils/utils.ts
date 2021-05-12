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
