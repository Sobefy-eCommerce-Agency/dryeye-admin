import { AddressComponent, Practice } from "../../types/interfaces/practices";

export const buildPostPracticePayload = (
  data: Practice,
  additionalData: AddressComponent
) => {
  if (additionalData) {
    const { practice, createdAt, ...rest } = data;
    const payload = {
      ...rest,
      ...additionalData,
    };
    return payload;
  }
  return null;
};
