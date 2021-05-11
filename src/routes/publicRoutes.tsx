import { Redirect, Route, Switch } from "react-router-dom";
import Locator from "../components/locator/locator";
import LocatorV2 from "../components/LocatorV2/Locator";
import Login from "../components/login/login";
import { LocatorProvider } from "../components/context/locatorContext";
import PublicRoute from "./publicRoute";
import { useAuth } from "../components/context/context";

export default function PublicRoutes() {
  const { state } = useAuth();
  const { authenticated } = state;
  return (
    <Switch>
      <PublicRoute path="/login" exact>
        <Login />
      </PublicRoute>
      <Route path="/locator" exact>
        <LocatorProvider>
          <Locator />
        </LocatorProvider>
      </Route>
      <Route path="/locator-new" exact>
        <LocatorProvider>
          <LocatorV2 />
        </LocatorProvider>
      </Route>
      {!authenticated ? <Redirect to={`/login`} /> : null}
    </Switch>
  );
}
