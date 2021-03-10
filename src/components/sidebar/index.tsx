import { Box, Flex, Grid } from "@chakra-ui/layout";
import SidebarLink from "./link";
import Logo from "../../assets/images/logo.webp";
import { Image } from "@chakra-ui/image";

const Sidebar = () => {
  return (
    <Box background="brand.primary">
      <Flex
        alignItems="center"
        justifyContent="center"
        background="brand.primary"
        h="120px"
        mb={6}
      >
        <Image h="70px" src={Logo} />
      </Flex>
      <Grid gridRowGap={4}>
        <SidebarLink label="Practices" route="/practices" />
        <SidebarLink label="Doctors" route="/doctors" />
        <SidebarLink label="Patients" route="/patients" />
      </Grid>
    </Box>
  );
};

export default Sidebar;
