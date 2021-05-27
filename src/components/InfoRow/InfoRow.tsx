import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface InfoRowProps {
  title: string;
  content: string | React.ReactNode;
  icon: IconType;
  isActive: boolean;
  darkBG?: boolean;
  size?: "sm";
}

const InfoRow = ({
  title,
  content,
  icon,
  isActive,
  darkBG = false,
  size,
}: InfoRowProps) => {
  const textColor = isActive && darkBG ? "white" : "brand.primary";
  return (
    <Flex>
      <Box pr={3}>
        <Icon as={icon} color="brand.secondary" />
      </Box>
      <Box>
        <Text
          fontWeight="700"
          color={textColor}
          fontSize={size && size === "sm" ? 12 : 14}
          mb={1}
        >
          {title}
        </Text>
        <Box color={textColor} fontSize={size && size === "sm" ? 12 : 14}>
          {content}
        </Box>
      </Box>
    </Flex>
  );
};

export default InfoRow;
