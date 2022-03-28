import {
  ActionType,
  EntityDataType,
  EntityType,
} from "../types/commons/commons";
import { AddressComponent } from "../types/interfaces/practices";

export const buildEntityPayload = (
  id: EntityType,
  action: ActionType,
  data: EntityDataType<any>,
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
          const {
            doctor,
            owner,
            firstName,
            lastName,
            email,
            practice,
            createAffiliateAccount,
            profilePicture,
          } = data;
          return {
            doctor,
            customer: owner,
            firstName,
            lastName,
            email,
            practice,
            createAffiliateAccount,
            profilePicture,
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

    case "services":
      if (data) {
        if (action === "create") {
          const { createdAt, ...rest } = data;
          const payload = {
            ...rest,
          };
          return payload;
        }
        if (action === "edit") {
          return data;
        }
        const { id } = data;
        return {
          id,
        };
      }
      return null;

    default:
      return null;
  }
};
