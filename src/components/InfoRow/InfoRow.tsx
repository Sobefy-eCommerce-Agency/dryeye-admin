import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface InfoRowProps {
  title: string;
  content: string | React.ReactNode;
  icon: IconType;
  isActive: boolean;
  darkBG?: boolean;
  size?: "sm";
  behavior?: "none" | "phone" | "email" | "website";
}

const InfoRow = ({
  title,
  content,
  icon,
  isActive,
  darkBG = false,
  size,
  behavior = "none",
}: InfoRowProps) => {
  const textColor = isActive && darkBG ? "white" : "brand.primary";

  const RenderContent = () => {
    switch (behavior) {
      case "website":
        if (typeof content === "string")
          return (
            <Link href={content} isExternal>
              {content}
            </Link>
          );
        return null;
      case "phone":
        if (typeof content === "string")
          return <Link href={`tel:${content}`}>{content}</Link>;
        return null;
      default:
        return content;
    }
  };
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
          {RenderContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default InfoRow;
