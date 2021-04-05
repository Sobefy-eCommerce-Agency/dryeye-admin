import { Box, Link, Text } from "@chakra-ui/layout";
import { Practice } from "../../types/interfaces/practices";

interface LocatorCardProps {
  location: Practice;
  activeLocation: Practice | null;
  onClick(location: Practice): void;
}

const LocatorCard = ({
  location,
  activeLocation,
  onClick,
}: LocatorCardProps) => {
  const {
    name,
    dryEyeTreatments,
    dryEyeProducts,
    eyeCareServices,
    phone,
  } = location;
  const isActive = location.practice === activeLocation?.practice;
  const hasCoordinates = location.latitude && location.longitude;
  return (
    <>
      {hasCoordinates ? (
        <Box
          boxShadow="md"
          p={5}
          cursor="pointer"
          onClick={() => onClick(location)}
          background={isActive ? "brand.primary" : "white"}
          mx={5}
          borderRadius={5}
          _hover={{ background: isActive ? "auto" : "gray.100" }}
          color={isActive ? "white" : "black"}
          transition=".2s ease"
        >
          <Text fontSize={18} fontWeight={700} mb={3}>
            {name}
          </Text>
          {dryEyeTreatments && dryEyeTreatments.length > 0 ? (
            <Box mb={3}>
              <Text fontSize={16} fontWeight={600} as="u">
                Dryeye Treatments
              </Text>
              <Box>
                {dryEyeTreatments.map(
                  (treatment, i) =>
                    `${treatment}${i + 1 < dryEyeTreatments.length ? ", " : ""}`
                )}
              </Box>
            </Box>
          ) : null}
          {dryEyeProducts ? (
            <Box>
              <Text fontSize={16} fontWeight={600} as="u">
                Dryeye Products
              </Text>
              <Box>{dryEyeProducts}</Box>
            </Box>
          ) : null}
          {eyeCareServices && eyeCareServices.length > 0 ? (
            <Box>
              <Text fontSize={16} fontWeight={600} as="u">
                Eye Care Services
              </Text>
              <Box>
                {eyeCareServices.map(
                  (service, i) =>
                    `${service}${i + 1 < eyeCareServices.length ? ", " : ""}`
                )}
              </Box>
            </Box>
          ) : null}
          <Link href={`tel:${phone}`}>{phone}</Link>
        </Box>
      ) : null}{" "}
    </>
  );
};

export default LocatorCard;
