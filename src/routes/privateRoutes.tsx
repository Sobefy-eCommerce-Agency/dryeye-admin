import { Redirect, Switch } from "react-router-dom";
import { useAuth } from "../components/context/context";
import Dashboard from "../components/screens/dashboard/dashboard";
import PrivateRoute from "./privateRoute";
import { checkForValidRoute } from "../utils/utils";

export default function PrivateRoutes() {
  const { state } = useAuth();
  const { authenticated } = state;
  const allowedRoute = checkForValidRoute(window.location.pathname);

  return (
    <Switch>
      <PrivateRoute path="/practices" exact>
        <Dashboard entityName="practices" />
      </PrivateRoute>
      <PrivateRoute path="/doctors" exact>
        <Dashboard entityName="doctors" />
      </PrivateRoute>
      <PrivateRoute path="/patients" exact>
        <Dashboard entityName="patients" />
      </PrivateRoute>
      {authenticated && !allowedRoute ? <Redirect to={`/practices`} /> : null}
    </Switch>
  );
}
