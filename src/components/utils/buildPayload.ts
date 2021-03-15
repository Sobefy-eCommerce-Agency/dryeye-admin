import { ActionType, EntityType } from "../../types/commons/commons";
import { AddressComponent, Practice } from "../../types/interfaces/practices";

export const buildEntityPayload = (
  id: EntityType,
  action: ActionType,
  data: Practice | {},
  additionalData: AddressComponent
) => {
  switch (id) {
    case "practices":
      if (data) {
        if (action === "create") {
          const payload = {
            ...data,
            ...additionalData,
          };
          return payload;
        }
        const payload = {
          ...data,
          ...additionalData,
        };
        return payload;
      }
      return null;
    default:
      return null;
  }
};
