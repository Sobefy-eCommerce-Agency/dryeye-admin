import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useAuth } from "./components/context/context";
import PrivateRoutes from "./routes/privateRoutes";
import { Box } from "@chakra-ui/layout";
import PublicRoutes from "./routes/publicRoutes";

function App() {
  const { dispatch, state } = useAuth();
  const { isAuthenticating, authenticated } = state;
  async function onLoad() {
    try {
      await Auth.currentSession();
      dispatch({ type: "authenticate", value: true });
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    dispatch({ type: "isAuthenticating", value: false });
  }

  useEffect(() => {
    onLoad();
  }, []);

  return !isAuthenticating ? (
    <Box width="full" height="full">
      {authenticated ? <PrivateRoutes /> : null}
      <PublicRoutes />
    </Box>
  ) : null;
}

export default App;
