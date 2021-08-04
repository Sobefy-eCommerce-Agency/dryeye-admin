import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Checkbox, Grid } from "@chakra-ui/react";
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
  const [selectedProducts, setSelectedProducts] = useState<number[] | []>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const handleSelectProduct = (product: number, selected: boolean) => {
    if (selected) {
      const filteredProducts = selectedProducts.filter(
        (prod) => prod !== product
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
          // filter products by No Locator tag
          const filteredProducts = productsResult.filter((prod: Product) => {
            const includesNoLocator = prod.tags.includes("No Locator");
            return !includesNoLocator;
          });
          // Sort by alphabetical order
          const sortedProducts = filteredProducts.sort(
            (a: Product, b: Product) => {
              let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();
              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            }
          );
          setProducts(sortedProducts);
          const selectedProducts =
            value && typeof value !== "string"
              ? value.map((val: number) => {
                  const filtered = sortedProducts.filter(
                    (sorted: any) => sorted.id === val
                  );
                  if (filtered.length === 1) return filtered[0].id;
                  return null;
                })
              : [];
          const notNullSelectedProducts = selectedProducts.filter(
            (el: any) => el !== null
          );
          if (notNullSelectedProducts.length > 0) {
            setSelectedProducts(notNullSelectedProducts);
            setFieldValue(id, notNullSelectedProducts);
          }
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
          marginTop={3}
        >
          {products.map((product) => {
            const { id, title } = product;
            const isSelected = selectedProducts
              ? selectedProducts.filter((prod) => prod === id).length === 1
              : false;

            return (
              <Box key={id} width="full">
                <Checkbox
                  colorScheme="purple"
                  isChecked={isSelected}
                  onChange={() => handleSelectProduct(id, isSelected)}
                  alignItems="flex-start"
                >
                  <Box marginTop={-1}>{title}</Box>
                </Checkbox>
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
