import {
  Tag,
  TagLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Grid,
  Text,
  Image,
} from "@chakra-ui/react";
import { Product } from "../../../../../types/commons/commons";

interface ProductTagProps {
  products: Product[];
  vendor: string;
  practiceName: string;
  isActive: boolean;
}

const ProductTag = ({
  products,
  vendor,
  practiceName,
  isActive,
}: ProductTagProps) => {
  const ProductCard = ({ product }: { product: Product }) => {
    const { images, title } = product;
    const image = images && images.length > 0 ? images[0].src : "";

    return (
      <Box
        display="flex"
        flexDirection={{ base: "row", md: "column" }}
        background="brand.grey.light"
        borderRadius={8}
        boxShadow="sm"
        padding={2}
      >
        <Box
          mb={{ base: 0, md: 2 }}
          width={{ base: "50%", md: "full" }}
          mr={{ base: 3, md: 0 }}
        >
          <Image src={image} width="full" />
        </Box>
        <Box width={{ base: "50%", md: "full" }}>
          <Text fontSize="sm" fontWeight="semibold">
            {title}
          </Text>
        </Box>
      </Box>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const backgroundColor = () => {
    if (isActive && isOpen) {
      return "brand.secondary";
    }
    if (isActive) {
      return "brand.primaryColor.light";
    }
    return "brand.grey.light";
  };
  const color = isActive ? "white" : "inherit";

  return (
    <>
      <Tag
        mr={1}
        mb={1}
        onClick={onOpen}
        background={backgroundColor()}
        color={color}
      >
        <TagLabel>{vendor}</TagLabel>
      </Tag>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${vendor} - ${practiceName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={7}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={3}>
              {products.map((product) => {
                return <ProductCard product={product} />;
              })}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductTag;
