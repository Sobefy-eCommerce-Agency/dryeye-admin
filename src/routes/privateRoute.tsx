import { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../components/context/context";

type PrivateRouteProps = {
  children: ReactNode;
  path: string;
  exact: boolean;
};

const PrivateRoute = ({ children, path, exact }: PrivateRouteProps) => {
  const { state } = useAuth();
  const { authenticated } = state;
  return (
    <Route path={path} exact={exact}>
      {authenticated ? children : <Redirect to={`/login`} />}
    </Route>
  );
};

export default PrivateRoute;
