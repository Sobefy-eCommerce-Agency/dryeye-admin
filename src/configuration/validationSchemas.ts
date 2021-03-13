import * as Yup from "yup";

export const PracticesSchema = Yup.object().shape({
  doctor: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(11, "Too Short!")
    .max(11, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email"),
  address: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
