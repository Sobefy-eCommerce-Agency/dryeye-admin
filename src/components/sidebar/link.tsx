import { Box, Link } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

interface SidebarLinkProps {
  label: string;
  route: string;
}

const SidebarLink = ({ label, route }: SidebarLinkProps) => {
  return (
    <Box display="flex">
      <Link
        as={RouterLink}
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
      >
        {label}
      </Link>
    </Box>
  );
};

export default SidebarLink;
