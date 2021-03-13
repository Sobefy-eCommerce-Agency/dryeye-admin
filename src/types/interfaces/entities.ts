import {
  EntityType,
  InputType,
  MaskType,
  FieldGroupType,
} from "../commons/commons";

export interface Column {
  column: string;
  label: string;
  type: "text" | "number" | "date" | "boolean";
  sort: boolean;
}

export interface FieldSet {
  id: string;
  label: string;
  placeholder: string;
  type: InputType;
  mask?: MaskType;
  group: FieldGroupType;
}

export interface FieldSetGroup {
  id: string;
  label: string;
}

export interface Entity {
  id: EntityType;
  label: string;
  route: string;
  data: {
    get: string;
    create: string;
    update: string;
    delete: string;
  };
  columns: Column[];
  fieldSet: FieldSet[];
  fieldSetGroups: FieldSetGroup[];
}
