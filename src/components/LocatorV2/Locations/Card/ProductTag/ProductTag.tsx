import {
  Tag,
  TagLabel,
  Box,
  Grid,
  Text,
  Image,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
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
          <Text fontSize="sm">{title}</Text>
        </Box>
      </Box>
    );
  };

  const backgroundColor = () => {
    if (isActive) {
      return "brand.primaryColor.light";
    }
    return "brand.grey.light";
  };
  const color = isActive ? "white" : "inherit";

  return (
    <>
      <Popover
        size="xl"
        closeOnBlur
        returnFocusOnClose={false}
        isLazy
        autoFocus
      >
        <PopoverTrigger>
          <Tag mr={1} mb={1} background={backgroundColor()} color={color}>
            <TagLabel>{vendor}</TagLabel>
          </Tag>
        </PopoverTrigger>
        <PopoverContent color="brand.grey.dark">
          <PopoverHeader>
            <Text fontWeight="semibold">{vendor}</Text>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody pb={3}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
              {products.map((product) => {
                return <ProductCard product={product} />;
              })}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProductTag;
