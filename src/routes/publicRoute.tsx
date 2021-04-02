import { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../components/context/context";

type PublicRouteProps = {
  children: ReactNode;
  path: string;
  exact: boolean;
};

const PublicRoute = ({ children, path, exact }: PublicRouteProps) => {
  const { state } = useAuth();
  const { authenticated } = state;
  return (
    <Route path={path} exact={exact}>
      {!authenticated ? children : <Redirect to="/practices" />}
    </Route>
  );
};

export default PublicRoute;
