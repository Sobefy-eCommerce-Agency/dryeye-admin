import {
  ActionType,
  EntityDataType,
  EntityType,
} from "../types/commons/commons";

export const GetInitialValues = (
  entity: EntityType,
  action: ActionType,
  entityData: EntityDataType | null
): Object | {} => {
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
        preferred: false,
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
  entityData: EntityDataType
) => {
  switch (entity) {
    case "practices":
      if (action === "edit") {
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
          eyeCareServices,
          dryEyeTreatments,
          dryEyeProducts,
          suite_number,
          preferred,
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
