import { Switch } from "react-router-dom";
import Login from "../components/login/login";
import PublicRoute from "./publicRoute";

export default function PublicRoutes() {
  return (
    <Switch>
      <PublicRoute path="/login" exact>
        <Login />
      </PublicRoute>
    </Switch>
  );
}
