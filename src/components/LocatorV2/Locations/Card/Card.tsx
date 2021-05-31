import { Box, Grid, HStack, Text } from "@chakra-ui/react";
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
import Tag from "./Tag/Tag";
import InfoRow from "../../../InfoRow/InfoRow";
interface CardProps {
  location: Practice;
  isActive: boolean;
  reference: ((node: HTMLDivElement) => void) | null;
  onClick(location: Practice): void;
  treatmentsAndServices: any[] | null;
}

const Card = ({
  location,
  isActive,
  onClick,
  reference,
  treatmentsAndServices,
}: CardProps) => {
  const {
    practice,
    name,
    address,
    website,
    dryEyeTreatments,
    dryEyeProducts,
    eyeCareServices,
    phone,
    latitude,
    longitude,
    providerPlus,
    provider,
    partner,
    doctors,
  } = location;

  // Convert array to comma string
  const currentDryeyeTreatments = treatmentsAndServices?.filter(
    (el) => el.type === "treatment"
  );
  const currentEyeCareServices = treatmentsAndServices?.filter(
    (el) => el.type === "service"
  );

  const dryeyeTeatmentsObject: any[] = [];
  dryEyeTreatments.forEach((treatment) => {
    currentDryeyeTreatments?.forEach((definedTreatment) => {
      if (treatment === definedTreatment.id) {
        dryeyeTeatmentsObject.push(definedTreatment);
      }
    });
  });

  const eyeCareServicesObject: any[] = [];
  eyeCareServices.forEach((service) => {
    currentEyeCareServices?.forEach((definedService) => {
      if (service === definedService.id) {
        eyeCareServicesObject.push(definedService);
      }
    });
  });

  const dryEyeTreatmentsString = dryeyeTeatmentsObject
    ? arrayToCommaString(dryeyeTeatmentsObject, "treatments")
    : "";
  const eyeCareServicesString = eyeCareServicesObject
    ? arrayToCommaString(eyeCareServicesObject, "services")
    : "";

  const hasCoordinates = latitude && longitude;
  return (
    <>
      {hasCoordinates ? (
        <Box
          display="flex"
          flexDirection={{ base: "column-reverse", md: "row" }}
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
          id={practice}
        >
          <Box p={5} width={{ base: "100%", md: "70%" }}>
            <HStack>
              {providerPlus ? (
                <Box mb={6}>
                  <Tag label="Provider" type="providerPlus" />
                </Box>
              ) : null}
              {provider ? (
                <Box mb={6}>
                  <Tag label="Provider" type="provider" />
                </Box>
              ) : null}
              {partner ? (
                <Box mb={6}>
                  <Tag label="Partner" type="partner" />
                </Box>
              ) : null}
            </HStack>
            <Grid
              templateColumns={{
                base: "1fr",
                md: dryEyeTreatments && eyeCareServices ? "1fr 1fr" : "1fr",
              }}
              mb={3}
              rowGap={{ base: 3, md: 0 }}
            >
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
            <Grid
              templateColumns={{
                base: "1fr",
                md: dryEyeProducts && doctors ? "1fr 1fr" : "1fr",
              }}
              rowGap={{ base: 3, md: 0 }}
            >
              {dryEyeProducts && typeof dryEyeProducts !== "string" ? (
                <InfoRow
                  title="DryEye Products:"
                  content={dryEyeProducts.map((product, i) => {
                    if (i < 10) {
                      return <p key={product.id}>{product.title}</p>;
                    }
                    return null;
                  })}
                  icon={IoMedkitSharp}
                  isActive={isActive}
                  darkBG
                />
              ) : null}
              {doctors ? (
                <InfoRow
                  title="Doctors:"
                  content={doctors.map((dr) => (
                    <p key={dr.doctor}>{`${dr.firstName} ${dr.lastName}`}</p>
                  ))}
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
            borderTopLeftRadius={{ base: "2xl", md: 0 }}
            borderTopRightRadius="2xl"
            borderBottomRightRadius={{ base: 0, md: "2xl" }}
            width={{ base: "100%", md: "30%" }}
          >
            <Text
              fontSize={24}
              fontWeight={700}
              color="brand.primary"
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
