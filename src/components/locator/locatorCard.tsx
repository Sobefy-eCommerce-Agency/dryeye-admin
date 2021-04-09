import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { Practice } from "../../types/interfaces/practices";
import { arrayToCommaString } from "../../utils/format";
import {
  IoLocationSharp,
  IoCallSharp,
  IoGlobeSharp,
  IoEyeSharp,
  IoMedicalSharp,
  IoMedkitSharp,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
interface LocatorCardProps {
  location: Practice;
  activeLocation: Practice | null;
  onClick(location: Practice): void;
}

interface InfoRowProps {
  title: string;
  content: string;
  icon: IconType;
  isActive: boolean;
}

const InfoRow = ({ title, content, icon, isActive }: InfoRowProps) => {
  const textColor = isActive ? "white" : "brand.primary";
  return (
    <Flex>
      <Box pr={3}>
        <Icon as={icon} color="brand.secondary" />
      </Box>
      <Box>
        <Text fontWeight="700" color={textColor} fontSize={14} mb={1}>
          {title}
        </Text>
        <Text color={textColor} fontSize={14}>
          {content}
        </Text>
      </Box>
    </Flex>
  );
};

const LocatorCard = ({
  location,
  activeLocation,
  onClick,
}: LocatorCardProps) => {
  const {
    name,
    address,
    website,
    dryEyeTreatments,
    dryEyeProducts,
    eyeCareServices,
    phone,
  } = location;

  // Convert array to comma string
  const dryEyeTreatmentsString = arrayToCommaString(dryEyeTreatments);
  const eyeCareServicesString = arrayToCommaString(eyeCareServices);

  const isActive = location.practice === activeLocation?.practice;
  const hasCoordinates = location.latitude && location.longitude;
  const isPreferred = location.name === "Bocaview";
  const textAlign = isPreferred ? "center" : "left";
  return (
    <>
      {hasCoordinates ? (
        <Box
          boxShadow={isActive ? "md" : "sm"}
          cursor="pointer"
          onClick={() => onClick(location)}
          background={isActive ? "brand.primary" : "white"}
          mx={5}
          borderTopLeftRadius="2xl"
          borderTopRightRadius="2xl"
          borderBottomRadius="2xl"
          _hover={{
            background: isActive ? "auto" : "gray.100",
            boxShadow: "md",
          }}
          color={isActive ? "white" : "black"}
          transition=".2s ease"
          height="min-content"
        >
          <Flex minHeight="58px">
            {isPreferred ? (
              <Flex
                background="brand.secondary"
                textAlign="center"
                align="center"
                justify="center"
                borderTopRightRadius="full"
                borderBottomRightRadius="full"
                boxShadow="6px 6px 20px 4px #2ba8bf61"
                maxHeight="58px"
                minWidth="38%"
                p={8}
              >
                <Text fontSize={18} fontWeight={500} color="white">
                  Preferred
                </Text>
              </Flex>
            ) : null}
            <Flex
              width="100%"
              textAlign={textAlign}
              align="center"
              justify="center"
              py={6}
              px={8}
            >
              <Text
                fontSize={24}
                fontWeight={700}
                color={`${isActive ? "white" : "brand.primary"}`}
                width="100%"
                lineHeight={1}
              >
                {name}
              </Text>
            </Flex>
          </Flex>
          <Grid p={8} pt={`${isPreferred ? 8 : 2}`} rowGap={4}>
            {address ? (
              <InfoRow
                title="Address:"
                content={address}
                icon={IoLocationSharp}
                isActive={isActive}
              />
            ) : null}
            {phone ? (
              <InfoRow
                title="Phone:"
                content={phone}
                icon={IoCallSharp}
                isActive={isActive}
              />
            ) : null}
            {dryEyeTreatments && dryEyeTreatments.length > 0 ? (
              <InfoRow
                title="DryEye Treatments:"
                content={dryEyeTreatmentsString}
                icon={IoEyeSharp}
                isActive={isActive}
              />
            ) : null}
            {eyeCareServices && eyeCareServices.length > 0 ? (
              <InfoRow
                title="Eyecare Services:"
                content={eyeCareServicesString}
                icon={IoMedicalSharp}
                isActive={isActive}
              />
            ) : null}
            {dryEyeProducts ? (
              <InfoRow
                title="DryEye Products:"
                content={dryEyeProducts}
                icon={IoMedkitSharp}
                isActive={isActive}
              />
            ) : null}
            {website ? (
              <InfoRow
                title="Website:"
                content={website}
                icon={IoGlobeSharp}
                isActive={isActive}
              />
            ) : null}
          </Grid>
        </Box>
      ) : null}{" "}
    </>
  );
};

export default LocatorCard;
