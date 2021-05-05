import { Auth } from "aws-amplify";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import SidebarLink from "./link";
import Logo from "../../assets/images/logo.webp";
import { useAuth } from "../context/context";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { dispatch } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();
    dispatch({ type: "authenticate", value: false });
    history.push("/login");
  };

  return (
    <Flex
      background="brand.primary"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="space-between"
      px={10}
      py={10}
    >
      <Box width="full">
        <Flex
          alignItems="center"
          justifyContent="center"
          background="brand.primary"
          h="90px"
          mb={6}
        >
          <Image h="70px" src={Logo} />
        </Flex>
        <Grid gridRowGap={4}>
          <SidebarLink label="Practices" route="/practices" />
          <SidebarLink
            label="Services & Treatments"
            route="/services-and-treatments"
          />
          <SidebarLink label="Doctors" route="/doctors" />
          <SidebarLink label="Patients" route="/patients" />
          <SidebarLink label="Locator" route="/locator-admin" />
        </Grid>
      </Box>
      <Box width="full">
        <Divider orientation="horizontal" opacity={0.2} />
        <Button
          onClick={handleLogout}
          width="full"
          color="white"
          variant="unstyled"
          display="flex"
          justifyContent="flex-start"
          mt={6}
        >
          <FiLogOut />
          <Text ml={5}>Log out</Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default Sidebar;
