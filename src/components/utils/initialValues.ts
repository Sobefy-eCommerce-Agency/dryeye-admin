import { ActionType, EntityType } from "../../types/commons/commons";
import { Practice } from "../../types/interfaces/practices";

export const GetInitialValues = (
  entity: EntityType,
  action: ActionType,
  entityData: Practice | null
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
    default:
      return {};
  }
};

export const GetInitialAddressComponents = (
  entity: EntityType,
  action: ActionType,
  entityData: Practice | null
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
    default:
      return null;
  }
};
