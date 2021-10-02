import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

const AppContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Grid templateColumns=".2fr 1fr" width="full" height="full">
      {children}
    </Grid>
  );
};

export default AppContainer;
