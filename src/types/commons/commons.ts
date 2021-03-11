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
