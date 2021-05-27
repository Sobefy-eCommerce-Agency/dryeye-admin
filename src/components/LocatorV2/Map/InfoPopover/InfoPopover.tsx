import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { InfoWindow } from "@react-google-maps/api";
import { IoCallSharp, IoGlobeSharp, IoLocationSharp } from "react-icons/io5";
import { Practice } from "../../../../types/interfaces/practices";
import InfoRow from "../../../InfoRow/InfoRow";

interface InfoPopoverProps {
  location: Practice | null;
  onCloseClick(): void;
}

const InfoPopover = ({ location, onCloseClick }: InfoPopoverProps) => {
  if (location) {
    const { name, latitude, longitude, address, phone, email, website } =
      location;
    if (typeof latitude === "number" && typeof longitude === "number") {
      return (
        <InfoWindow
          position={{ lat: latitude, lng: longitude }}
          onCloseClick={onCloseClick}
        >
          <Box width="400px" p={1}>
            <Text
              fontSize={16}
              fontWeight={700}
              color={"brand.primary"}
              width="100%"
              lineHeight={1.2}
              mb={3}
            >
              {name}
            </Text>
            {address ? (
              <InfoRow
                title="Address:"
                content={address}
                icon={IoLocationSharp}
                isActive={false}
                size="sm"
              />
            ) : null}
            <Grid templateColumns="1fr 1fr" rowGap={2} my={3}>
              {phone ? (
                <InfoRow
                  title="Phone:"
                  content={phone}
                  icon={IoCallSharp}
                  isActive={false}
                  size="sm"
                />
              ) : null}
              {website ? (
                <InfoRow
                  title="Website:"
                  content={website}
                  icon={IoGlobeSharp}
                  isActive={false}
                  size="sm"
                />
              ) : null}
            </Grid>
            {/* <Button
              background="brand.secondaryColor.light"
              color="white"
              _hover={{
                background: "brand.secondaryColor.dark",
              }}
              size="xs"
            >
              More information
            </Button> */}
          </Box>
        </InfoWindow>
      );
    }
    return null;
  }
  return null;
};

export default InfoPopover;
