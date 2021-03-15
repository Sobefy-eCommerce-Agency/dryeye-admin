import { ActionType, EntityType } from "../../types/commons/commons";
import { Doctors } from "../../types/interfaces/doctors";
import { Patients } from "../../types/interfaces/patients";
import { Practice } from "../../types/interfaces/practices";

export const GetInitialValues = (
  entity: EntityType,
  action: ActionType,
  entityData: Practice | Doctors | Patients | null
) => {
  switch (entity) {
    case "practices":
      if (action === "edit" && entityData) {
        const {
          route,
          street_number,
          city,
          county,
          state,
          state_short,
          country,
          country_short,
          zip,
          latitude,
          longitude,
          createdAt,
          ...rest
        } = entityData;
        return { ...rest };
      }
      return {
        doctor: "",
        name: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        facebook_url: "",
        instagram_url: "",
        twitter_url: "",
        monday_op_hours: "",
        tuesday_op_hours: "",
        wednesday_op_hours: "",
        thursday_op_hours: "",
        friday_op_hours: "",
        saturday_op_hours: "",
        sunday_op_hours: "",
      };
    case "doctors":
      if (action === "edit" && entityData) {
        const { createdAt, ...rest } = entityData;
        return { ...rest };
      }
      return {
        firstName: "",
        lastName: "",
        practice: "",
        owner: "",
      };
    case "patients":
      if (action === "edit" && entityData) {
        const { createdAt, ...rest } = entityData;
        return { ...rest };
      }
      return {
        user: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
      };
    default:
      return {};
  }
};

export const GetInitialAddressComponents = (
  entity: EntityType,
  action: ActionType,
  entityData: Practice | Doctors
) => {
  switch (entity) {
    case "practices":
      if (action === "edit" && entityData) {
        const {
          practice,
          doctor,
          email,
          facebook_url,
          friday_op_hours,
          instagram_url,
          monday_op_hours,
          name,
          phone,
          saturday_op_hours,
          sunday_op_hours,
          thursday_op_hours,
          tuesday_op_hours,
          twitter_url,
          website,
          wednesday_op_hours,
          createdAt,
          ...rest
        } = entityData;
        return { ...rest };
      }
      return null;
    case "doctors":
      return null;
    case "patients":
      return null;
  }
};
