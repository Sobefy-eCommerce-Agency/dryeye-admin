import {
  ActionType,
  EntityDataType,
  EntityType,
} from "../types/commons/commons";
import { AddressComponent } from "../types/interfaces/practices";

export const buildEntityPayload = (
  id: EntityType,
  action: ActionType,
  data: EntityDataType,
  additionalData: AddressComponent | null
) => {
  switch (id) {
    case "practices":
      if (data) {
        if (action === "create" || action === "edit") {
          const payload = {
            ...data,
            ...additionalData,
          };
          return payload;
        }
        const { doctor, practice } = data;
        return {
          doctor,
          practice,
        };
      }
      return null;

    case "doctors":
      if (data) {
        if (action === "create") {
          const { owner, createdAt, ...rest } = data;
          const payload = {
            customer: owner,
            ...rest,
          };
          return payload;
        }
        if (action === "edit") {
          const { doctor, owner, firstName, lastName, practice } = data;
          return {
            doctor,
            customer: owner,
            firstName,
            lastName,
            practice,
          };
        }
        const { doctor, owner } = data;
        return {
          doctor,
          customer: owner,
        };
      }
      return null;

    case "patients":
      if (data) {
        if (action === "create") {
          const { owner, createdAt, ...rest } = data;
          const payload = {
            customer: owner,
            ...rest,
          };
          return payload;
        }
        if (action === "edit") {
          return data;
        }
        const { patient, user } = data;
        return {
          patient,
          user,
        };
      }
      return null;
    default:
      return null;
  }
};
