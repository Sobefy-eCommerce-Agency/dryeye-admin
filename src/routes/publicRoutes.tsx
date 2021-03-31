import { Route, Switch } from "react-router-dom";
import Locator from "../components/locator/locator";
import Login from "../components/login/login";
import PublicRoute from "./publicRoute";

export default function PublicRoutes() {
  return (
    <Switch>
      <PublicRoute path="/login" exact>
        <Login />
      </PublicRoute>
      <Route path="/locator" exact>
        <Locator />
      </Route>
    </Switch>
  );
}
