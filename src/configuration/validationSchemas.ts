import * as Yup from "yup";
import { AddressComponent } from "../types/interfaces/practices";

export const PracticesSchema = (addressComponent: AddressComponent | null) => {
  console.log(addressComponent);
  return Yup.object().shape({
    doctor: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    address: Yup.string()
      .required("Required")
      .test(
        "address-component",
        "Please select an address from the list",
        function () {
          if (!addressComponent) {
            return false;
          }
          return true;
        }
      ),
    phone: Yup.string()
      .min(11, "Too Short!")
      .max(11, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email"),
  });
};
