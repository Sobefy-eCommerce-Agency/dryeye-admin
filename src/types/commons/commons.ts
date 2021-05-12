import { Doctors } from "../interfaces/doctors";
import { Patients } from "../interfaces/patients";
import { Practice } from "../interfaces/practices";

export type EntityType =
  | "practices"
  | "doctors"
  | "patients"
  | "servicesAndTreatments";
export type EntityDataType = Practice | Doctors | Patients;
export type RoleType = "administrator" | "editor" | "viewOnly";
export type ActionType = "view" | "create" | "edit" | "delete" | null;
export type InputType =
  | "text"
  | "textArea"
  | "number"
  | "select"
  | "date"
  | "email"
  | "tel"
  | "addressAutocomplete"
  | "selectAutocomplete"
  | "checkboxGroup"
  | "switch"
  | "multiProducts";
export type MaskType = "phone" | "date";
export type FieldGroupType =
  | "general"
  | "addressInformation"
  | "socialMedia"
  | "openingHours"
  | "eyeCareServices"
  | "dryEyeTreatments"
  | "dryEyeProducts"
  | "practiceCategory";
export type addressComponentField =
  | "street_number"
  | "route"
  | "locality"
  | "administrative_area_level_2"
  | "administrative_area_level_1"
  | "country"
  | "postal_code";
export type addressComponentNameLength = "short_name" | "long_name";
export type SelectAutocompleteList =
  | "customers"
  | "practices"
  | "serviceOrTreatment"
  | "eyeCareServices"
  | "dryEyeTreatments";
export type ColumnsKey = "doctor" | "practice" | "patient" | "id";
export type Center = { lat: number; lng: number };
export type ValueLabelPair = {
  value: string;
  label: string;
};
export interface ProductImage {
  id: number;
  position: number;
  src: string;
}
export interface Product {
  id: number;
  title: string;
  vendor: string;
  images: ProductImage[];
}
