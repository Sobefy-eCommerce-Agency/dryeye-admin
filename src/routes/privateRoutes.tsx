import { Redirect, Switch } from "react-router-dom";
import { useAuth } from "../components/context/context";
import Dashboard from "../components/screens/dashboard/dashboard";
import PrivateRoute from "./privateRoute";
import { checkForValidRoute } from "../utils/utils";
import { LocatorProvider } from "../components/context/locatorContext";
import LocatorV2 from "../components/LocatorV2/Locator";
import AppContainer from "../components/container/appContainer";
import Sidebar from "../components/sidebar/sidebar";

export default function PrivateRoutes() {
  const { state } = useAuth();
  const { authenticated } = state;
  const allowedRoute = checkForValidRoute(window.location.pathname);

  return (
    <Switch>
      <PrivateRoute path="/practices" exact>
        <Dashboard entityName="practices" />
      </PrivateRoute>
      <PrivateRoute path="/services" exact>
        <Dashboard entityName="services" />
      </PrivateRoute>
      <PrivateRoute path="/doctors" exact>
        <Dashboard entityName="doctors" />
      </PrivateRoute>
      <PrivateRoute path="/patients" exact>
        <Dashboard entityName="patients" />
      </PrivateRoute>
      <PrivateRoute path="/locator-admin" exact>
        <LocatorProvider>
          <AppContainer>
            <Sidebar />
            <LocatorV2 />
          </AppContainer>
        </LocatorProvider>
      </PrivateRoute>
      {authenticated && !allowedRoute ? <Redirect to={`/practices`} /> : null}
    </Switch>
  );
}
