import * as Yup from "yup";
import { EntityType } from "../types/commons/commons";
import { AddressComponent } from "../types/interfaces/practices";

export const getSchema = (
  entity: EntityType,
  addressComponent: AddressComponent | null
) => {
  switch (entity) {
    case "practices":
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
    case "doctors":
      return Yup.object().shape({
        practice: Yup.string().required("Required"),
        owner: Yup.string().required("Required"),
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
      });
    case "patients":
      return Yup.object().shape({
        user: Yup.string().required("Required"),
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        address2: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        zip: Yup.string().required("Required"),
      });
  }
};
