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
        return "brand.secondary";
      case "provider":
        return "brand.grey.dark";
      case "partner":
        return "brand.grey.dark";
      default:
        break;
    }
  };
  const hasIcon = type === "providerPlus";

  return (
    <ChakraTag
      size="md"
      variant="subtle"
      boxShadow="6px 6px 20px 4px #2ba8bf61"
      background={color()}
      color="white"
    >
      <TagLabel>{label}</TagLabel>
      {hasIcon ? <TagRightIcon boxSize="12px" as={AddIcon} /> : null}
    </ChakraTag>
  );
};

export default Tag;
