export type EntityType = "practices" | "doctors" | "patients";
export type RoleType = "administrator" | "editor" | "viewOnly";
export type ActionType = "idle" | "view" | "create" | "edit" | "delete";
export type InputType =
  | "text"
  | "number"
  | "select"
  | "date"
  | "email"
  | "tel"
  | "addressAutocomplete";
export type MaskType = "phone" | "date";
export type FieldGroupType =
  | "general"
  | "addressInformation"
  | "socialMedia"
  | "openingHours";
export type addressComponentField =
  | "street_number"
  | "route"
  | "locality"
  | "administrative_area_level_2"
  | "administrative_area_level_1"
  | "country"
  | "postal_code";
export type addressComponentNameLength = "short_name" | "long_name";