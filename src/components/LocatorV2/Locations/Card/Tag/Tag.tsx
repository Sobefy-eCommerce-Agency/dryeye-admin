import { AddIcon } from "@chakra-ui/icons";
import { Tag as ChakraTag, TagLabel, TagRightIcon } from "@chakra-ui/react";

interface TagProps {
  label: string;
  type: "providerPlus" | "provider" | "partner";
}

const Tag = ({ label, type }: TagProps) => {
  const color = () => {
    switch (type) {
      case "providerPlus":
        return {
          background: "brand.secondary",
          shadow: "#2ba8bf61",
        };
      case "provider":
        return {
          background: "brand.primary",
          shadow: "#5741b154",
        };
      case "partner":
        return {
          background: "#969696",
          shadow: "#80808078",
        };
      default:
        return {
          background: "#969696",
          shadow: "#80808078",
        };
    }
  };

  const hasIcon = type === "providerPlus";
  const colors = color();

  return (
    <ChakraTag
      size="md"
      variant="subtle"
      boxShadow={`6px 6px 20px 4px ${colors.shadow}`}
      background={colors.background}
      color="white"
    >
      <TagLabel>{label}</TagLabel>
      {hasIcon ? <TagRightIcon boxSize="12px" as={AddIcon} /> : null}
    </ChakraTag>
  );
};

export default Tag;
