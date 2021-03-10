import { Box, Link } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  label: string;
  route: string;
}

const SidebarLink = ({ label, route }: SidebarLinkProps) => {
  return (
    <Box display="flex">
      <Link
        as={NavLink}
        to={route}
        background="transparent"
        color="white"
        _hover={{
          background: "brand.primaryLight",
          color: "black",
        }}
        display="flex"
        w="100%"
        px={10}
        py={4}
        mx={10}
        borderRadius={10}
        fontSize={16}
        exact
      >
        {label}
      </Link>
    </Box>
  );
};

export default SidebarLink;
