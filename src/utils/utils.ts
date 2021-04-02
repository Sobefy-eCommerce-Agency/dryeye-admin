export const checkForValidRoute = (route: string) => {
  const validRoutes = ["/locator"];
  return validRoutes.includes(route);
};
