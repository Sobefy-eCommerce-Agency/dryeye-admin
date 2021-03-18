import { Switch } from "react-router-dom";
import Dashboard from "../components/screens/dashboard/dashboard";
import PrivateRoute from "./privateRoute";

export default function PrivateRoutes() {
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
    </Switch>
  );
}
