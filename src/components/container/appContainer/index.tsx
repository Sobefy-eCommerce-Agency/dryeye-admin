import { Grid } from "@chakra-ui/react";

const AppContainer: React.FC = ({ children }) => {
  return (
    <Grid templateColumns=".2fr 1fr" width="100%" height="100%">
      {children}
    </Grid>
  );
};

export default AppContainer;
