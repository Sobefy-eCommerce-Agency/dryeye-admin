import { EntityType, RoleType } from "../commons/commons";

export interface Entity {
  id: EntityType;
  actions: {
    view: boolean;
    create: boolean;
    update: boolean;
    remove: boolean;
    search: boolean;
  };
}

export interface Role {
  role: RoleType;
  entities: Entity[];
}
