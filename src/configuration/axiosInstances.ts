import axios from "axios";

const PracticesInstance = axios.create({
  baseURL: "https://api.dryeyerescue.com",
  headers: {
    "content-type": "application/json",
  },
});

const Api = {
  getPractices: () =>
    PracticesInstance({
      method: "GET",
      url: "/practices",
    }),
  postPractice: (data: object) =>
    PracticesInstance({
      method: "POST",
      url: "/practices",
      data,
    }),
  deletePractice: (data: object) =>
    PracticesInstance({
      method: "DELETE",
      url: "/practices",
      data,
    }),
};

export default Api;
