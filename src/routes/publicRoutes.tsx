import { Redirect, Switch } from "react-router-dom";
import Login from "../components/login/login";
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
      {!authenticated ? <Redirect to={`/login`} /> : null}
    </Switch>
  );
}
