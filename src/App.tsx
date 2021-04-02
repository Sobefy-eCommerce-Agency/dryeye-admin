import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useAuth } from "./components/context/context";
import PrivateRoutes from "./routes/privateRoutes";
import { Box } from "@chakra-ui/layout";
import PublicRoutes from "./routes/publicRoutes";
import { LocatorProvider } from "./components/context/locatorContext";

function App() {
  const { dispatch, state } = useAuth();
  const { isAuthenticating } = state;
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
      <LocatorProvider>
        <PrivateRoutes />
        <PublicRoutes />
      </LocatorProvider>
    </Box>
  ) : null;
}

export default App;
