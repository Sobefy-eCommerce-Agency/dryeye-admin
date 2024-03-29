import {
  addressComponentField,
  addressComponentNameLength,
  EntityDataType,
  EntityType,
  Product,
  SelectAutocompleteList,
  ValueLabelPair,
} from "../types/commons/commons";
import { Customer } from "../types/interfaces/customers";
import { Practice } from "../types/interfaces/practices";

export const GetAddressComponentValue = (
  components: google.maps.GeocoderAddressComponent[],
  type: addressComponentField,
  length: addressComponentNameLength
) => {
  const filteredComponent = components.filter((el) => el.types[0] === type);
  const result =
    filteredComponent.length === 1 ? filteredComponent[0][length] : "";
  return result;
};

export const FormatSelectAutocompleteData = (
  data: [],
  list: SelectAutocompleteList
) => {
  switch (list) {
    case "customers":
      return data.flatMap((el: Customer) => {
        if (el.doctor && el.first_name) {
          return {
            id: el.doctor,
            label: `${el.first_name} ${el.last_name}`,
          };
        }
        return [];
      });
    case "practices":
      return data.flatMap((el: Practice) => {
        if (el.practice && el.name) {
          return {
            id: el.practice,
            label: el.name,
          };
        }
        return [];
      });
  }
};

export const FormatCheckBoxData = (
  data: any[],
  list: SelectAutocompleteList
) => {
  switch (list) {
    case "eyeCareServices":
    case "dryEyeTreatments":
    case "tests":
      return data.flatMap((el: any) => {
        const { id, label } = el;
        if (id && label) {
          return {
            label,
            value: id,
          };
        }
        return [];
      });
    case "myDoctors":
      return data.flatMap((el: any) => {
        const { firstName, lastName, practice } = el;
        if (firstName && lastName && practice !== "") {
          const fullName = `${firstName.trim()} ${lastName.trim()}`;
          return {
            label: fullName,
            value: fullName,
          };
        }
        return [];
      });
  }
};

export const SearchString = (
  str: string | number | undefined | boolean | any[],
  searchTerm: string
) => {
  if (str) {
    const searchTermString = str.toString();
    return searchTermString.toLowerCase().search(searchTerm.toLowerCase());
  }
  return -1;
};

export const SearchByEntity = (
  entity: EntityType,
  data: EntityDataType<any>[] | null,
  searchTerm: string
) => {
  if (entity === "practices" && data) {
    const results = data.filter((el) => {
      if (el) {
        const hasName = SearchString(el.name, searchTerm);
        const hasAddress = SearchString(el.address, searchTerm);
        const hasCity = SearchString(el.city, searchTerm);
        const hasState = SearchString(el.state, searchTerm);
        if (
          hasName !== -1 ||
          hasAddress !== -1 ||
          hasCity !== -1 ||
          hasState !== -1
        ) {
          return true;
        }
        return false;
      }
      return false;
    });
    return results;
  }
  if (entity === "doctors" && data) {
    const results = data.filter((el) => {
      if (el) {
        const hasFirstName = SearchString(el.firstName, searchTerm);
        const hasLastName = SearchString(el.lastName, searchTerm);
        const hasPracticeName = SearchString(el.practiceName, searchTerm);
        const hastDoctorName = SearchString(el.doctorName, searchTerm);
        if (
          hasFirstName !== -1 ||
          hasLastName !== -1 ||
          hasPracticeName !== -1 ||
          hastDoctorName !== -1
        ) {
          return true;
        }
        return false;
      }
      return false;
    });
    return results;
  }
  if (entity === "patients" && data) {
    const results = data.filter((el) => {
      if (el) {
        const hasDoctorName = SearchString(el.doctorName, searchTerm);
        const hasFirstName = SearchString(el.firstName, searchTerm);
        const hasLastName = SearchString(el.lastName, searchTerm);
        const hasAddress = SearchString(el.address, searchTerm);
        const hasCity = SearchString(el.city, searchTerm);
        const hasState = SearchString(el.state, searchTerm);
        const hasEmail = SearchString(el.email, searchTerm);
        if (
          hasDoctorName !== -1 ||
          hasFirstName !== -1 ||
          hasLastName !== -1 ||
          hasAddress !== -1 ||
          hasCity !== -1 ||
          hasState !== -1 ||
          hasEmail !== -1
        ) {
          return true;
        }
        return false;
      }
      return false;
    });
    return results;
  }
  return [];
};

export const arrayToCommaString = (
  arr: any[],
  type: "treatments" | "services" | "doctors" | "tests"
) => {
  let str = "";
  if (arr && arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      let element = "";
      switch (type) {
        case "treatments":
        case "services":
        case "tests":
          element = arr[i].label;
          break;
      }
      str += `${element}${i + 1 < arr.length ? ", " : ""}`;
    }
  }
  return str;
};

export const getUniqueProducts = (
  practices: Practice[] | null,
  shopifyProducts: Product[] | null
) => {
  if (practices) {
    let products: ValueLabelPair[] = [];
    for (let i = 0; i < practices.length; i++) {
      const practice = practices[i];
      const { dryEyeProducts } = practice;
      const fileteredProducts = filterShopifyProducts(
        dryEyeProducts,
        shopifyProducts
      );
      if (fileteredProducts) {
        for (let j = 0; j < fileteredProducts.length; j++) {
          const product = fileteredProducts[j];
          const existingProduct = products.filter(
            (pr) => pr.value === String(product.id)
          );
          if (existingProduct.length === 0 && typeof product !== "string") {
            products.push({
              value: String(product.id),
              label: product.title,
            });
          }
        }
      }
    }
    return products;
  }
  return null;
};

export const getUniqueVendors = (products: Product[]) => {
  if (products) {
    const vendors = Array.from(new Set(products.map((item) => item.vendor)));
    return vendors;
  }
  return null;
};

export const formatURL = (url: string) => {
  const httpPattern = "http://";
  const httpsPattern = "https://";
  const urlIncludesHTTPPattern = url.includes(httpPattern);
  const urlIncludesHTTPSPattern = url.includes(httpsPattern);
  const urlHasAnyPattern = urlIncludesHTTPPattern || urlIncludesHTTPSPattern;
  return urlHasAnyPattern ? url : `${httpsPattern}${url}`;
};

export const filterShopifyProducts = (
  practiceProducts: number[],
  shopifyProducts: Product[] | null
) => {
  const filteredProducts: Product[] = [];
  console.log(practiceProducts);
  if (
    practiceProducts &&
    practiceProducts.length > 0 &&
    typeof practiceProducts !== "string" &&
    shopifyProducts &&
    shopifyProducts.length > 0
  ) {
    practiceProducts.forEach((practiceProduct) => {
      const filteredProduct = shopifyProducts.filter((shopifyProduct) => {
        if (
          typeof practiceProduct === "number" &&
          practiceProduct === shopifyProduct.id
        )
          return true;
        return false;
      });
      if (filteredProduct.length === 1)
        filteredProducts.push(filteredProduct[0]);
    });
  }
  return filteredProducts;
};
