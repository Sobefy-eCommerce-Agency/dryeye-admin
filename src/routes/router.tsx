import { Switch, Route } from "react-router-dom";
import Dashboard from "../components/screens/dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route path="/practices" component={Dashboard}></Route>
      <Route path="/doctors" component={Dashboard}></Route>
      <Route path="/patients" component={Dashboard}></Route>
      <Route path="/login"></Route>
    </Switch>
  );
}
