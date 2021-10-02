import { Redirect, Switch } from "react-router-dom";
import { useAuth } from "../components/context/context";
import Dashboard from "../components/screens/dashboard/dashboard";
import PrivateRoute from "./privateRoute";

export default function PrivateRoutes() {
  const { state } = useAuth();
  const { authenticated } = state;

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
      {authenticated ? <Redirect to={`/practices`} /> : null}
    </Switch>
  );
}
