export const checkForValidRoute = (route: string) => {
  const validRoutes = ["/locator", "/locator-new"];
  return validRoutes.includes(route);
};
