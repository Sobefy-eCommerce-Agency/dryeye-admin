import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { Practice } from "../../../../types/interfaces/practices";
import { arrayToCommaString } from "../../../../utils/format";
import {
  IoLocationSharp,
  IoCallSharp,
  IoGlobeSharp,
  IoEyeSharp,
  IoMedicalSharp,
  IoMedkitSharp,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import Tag from "./Tag/Tag";

interface CardProps {
  location: Practice;
  isActive: boolean;
  reference: ((node: HTMLDivElement) => void) | null;
  onClick(location: Practice): void;
}

interface InfoRowProps {
  title: string;
  content: string;
  icon: IconType;
  isActive: boolean;
  darkBG?: boolean;
}

const InfoRow = ({
  title,
  content,
  icon,
  isActive,
  darkBG = false,
}: InfoRowProps) => {
  const textColor = isActive && darkBG ? "white" : "brand.primary";
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

const Card = ({ location, isActive, onClick, reference }: CardProps) => {
  const {
    name,
    address,
    website,
    dryEyeTreatments,
    dryEyeProducts,
    eyeCareServices,
    phone,
    latitude,
    longitude,
    preferred,
  } = location;

  // Convert array to comma string
  const dryEyeTreatmentsString = arrayToCommaString(dryEyeTreatments);
  const eyeCareServicesString = arrayToCommaString(eyeCareServices);

  const hasCoordinates = latitude && longitude;
  return (
    <>
      {hasCoordinates ? (
        <Box
          display="flex"
          boxShadow={isActive ? "xl" : "xl"}
          cursor="pointer"
          onClick={() => onClick(location)}
          _hover={{
            boxShadow: "md",
          }}
          color={isActive ? "white" : "black"}
          transition=".2s ease"
          height="full"
          ref={reference}
          borderRadius="2xl"
          background={isActive ? "brand.primary" : "white"}
        >
          <Box p={5} width="60%" flexDirection="column">
            {preferred ? (
              <Box mb={6}>
                <Tag label="Provider" type="providerPlus" />
              </Box>
            ) : null}
            <Grid templateColumns="1fr 1fr" mb={3}>
              {dryEyeTreatments && dryEyeTreatments.length > 0 ? (
                <InfoRow
                  title="DryEye Treatments:"
                  content={dryEyeTreatmentsString}
                  icon={IoEyeSharp}
                  isActive={isActive}
                  darkBG
                />
              ) : null}
              {eyeCareServices && eyeCareServices.length > 0 ? (
                <InfoRow
                  title="Eyecare Services:"
                  content={eyeCareServicesString}
                  icon={IoMedicalSharp}
                  isActive={isActive}
                  darkBG
                />
              ) : null}
            </Grid>
            <Grid templateColumns="1fr 1fr">
              {dryEyeProducts ? (
                <InfoRow
                  title="DryEye Products:"
                  content={
                    typeof dryEyeProducts === "string" ? dryEyeProducts : ""
                  }
                  icon={IoMedkitSharp}
                  isActive={isActive}
                  darkBG
                />
              ) : null}
            </Grid>
          </Box>
          <Box
            background="brand.grey.light"
            p={5}
            borderTopRightRadius="2xl"
            borderBottomRightRadius="2xl"
            width="40%"
          >
            <Text
              fontSize={24}
              fontWeight={700}
              color={`${isActive ? "brand.primary" : "brand.primary"}`}
              width="100%"
              lineHeight={1.2}
              mb={4}
            >
              {name}
            </Text>
            <Grid column={1} rowGap={3}>
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
        </Box>
      ) : null}
    </>
  );
};

export default Card;
