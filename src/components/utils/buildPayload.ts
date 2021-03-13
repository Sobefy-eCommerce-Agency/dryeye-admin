import { Practice } from "../../types/interfaces/practices";

export const buildPostPracticePayload = (data: Practice) => {
  const { practice, createdAt, ...rest } = data;
  return rest;
};
