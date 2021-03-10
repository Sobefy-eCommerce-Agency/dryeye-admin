import { Switch, Route } from "react-router-dom";
import Practices from "../components/screens/practices";

export default function Routes() {
  return (
    <Switch>
      <Route path="/practices" component={Practices}></Route>
      <Route path="/login"></Route>
    </Switch>
  );
}
