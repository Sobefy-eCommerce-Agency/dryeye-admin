import { EntityType } from "../commons/commons";

export interface Column {
  column: string;
  label: string;
  type: "text" | "number" | "date" | "boolean";
  sort: boolean;
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
}
