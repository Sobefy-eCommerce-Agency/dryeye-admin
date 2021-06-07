import { Box, Heading, Text } from "@chakra-ui/react";
import Feature from "./Feature/Feature";
import { ReactComponent as TreatmentsIcon } from "../../../assets/icons/dryeye_treatments.svg";
import { ReactComponent as ProductsIcon } from "../../../assets/icons/dryeye_products.svg";
import { ReactComponent as EyecareServicesIcon } from "../../../assets/icons/eyecare_services.svg";

const Header = () => {
  return (
    <Box background="brand.primaryColor.light" py={12} px={8}>
      <Box
        maxWidth="1480px"
        margin="auto"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box width="full" mb={{ base: 6, md: 0 }}>
          <Heading
            color="white"
            fontSize={{ base: 50, md: 65 }}
            fontWeight="normal"
            as="h1"
            marginBottom={{ base: 6, md: 8 }}
            lineHeight={1}
          >
            Provider Directory
          </Heading>
          <Text color="white">
            Need products fast or are looking for trustworthy eye care provider?
            Use our free doctor locator and find the services you need. Enter
            your address below to find dry eye treatments, products or eye care
            services at a location near you.
          </Text>
        </Box>
        <Box
          width="full"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Feature title="Dry Eye Treatments" svg={<TreatmentsIcon />} />
          <Feature title="Dry Eye Products" svg={<ProductsIcon />} />
          <Feature title="Eye Care Services" svg={<EyecareServicesIcon />} />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
