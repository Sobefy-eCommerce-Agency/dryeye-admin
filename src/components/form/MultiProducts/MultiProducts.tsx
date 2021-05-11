import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { Product } from "../../../types/commons/commons";
import { FieldProps } from "formik";

interface MultiProductsProps {
  id: string;
}

const MultiProducts = ({
  id,
  form,
  field,
}: MultiProductsProps & FieldProps) => {
  const { setFieldValue } = form;
  const { value } = field;
  const [products, setProducts] = useState<Product[] | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[] | []>(
    value && typeof value !== "string" ? value : []
  );
  const [loadingProducts, setLoadingProducts] = useState(true);

  const handleSelectProduct = (product: Product, selected: boolean) => {
    if (selected) {
      const filteredProducts = selectedProducts.filter(
        (prod) => prod.id !== product.id
      );
      setSelectedProducts(filteredProducts);
      setFieldValue(id, filteredProducts);
    } else {
      const filteredProducts = [...selectedProducts, product];
      setSelectedProducts(filteredProducts);
      setFieldValue(id, filteredProducts);
    }
  };

  useEffect(() => {
    if (loadingProducts) {
      axios({
        url: "https://shop.dryeyerescue.com/products.json?limit=250&page=1",
      }).then((response) => {
        const {
          data: { products: productsResult },
        } = response;
        if (productsResult) {
          setLoadingProducts(false);
          setProducts(productsResult);
        }
      });
    }
  }, [products, loadingProducts]);

  return (
    <div>
      {!loadingProducts && products ? (
        <Grid
          templateColumns="1fr 1fr 1fr"
          gridGap={5}
          height="full"
          maxHeight={80}
          overflowY="auto"
        >
          {products.map((product) => {
            const { id, title, vendor, images } = product;
            const featuredImage = images[0];
            const isSelected = selectedProducts
              ? selectedProducts.filter((prod) => prod.id === id).length === 1
              : false;

            return (
              <Box
                key={id}
                width="full"
                borderRadius={4}
                boxShadow="md"
                padding={3}
                display="flex"
                cursor="pointer"
                onClick={() => handleSelectProduct(product, isSelected)}
                background={isSelected ? "brand.secondary" : "white"}
                transition=".2s ease"
              >
                <Box width="25%" marginRight={3}>
                  <Image
                    src={featuredImage ? featuredImage.src : ""}
                    alt="title"
                    borderRadius={3}
                    border="1px solid"
                    borderColor="brand.grey.light"
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  width="75%"
                >
                  <Text
                    fontSize={12}
                    marginBottom={2}
                    color={isSelected ? "white" : "black"}
                  >
                    {title}
                  </Text>
                  <Text
                    fontSize={12}
                    fontWeight="bold"
                    color={isSelected ? "white" : "black"}
                  >
                    {vendor}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Grid>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default MultiProducts;
