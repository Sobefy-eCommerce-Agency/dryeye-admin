import axios from "axios";

const DryEyeInstance = axios.create({
  baseURL: "https://api.dryeyerescue.com",
  headers: {
    "content-type": "application/json",
  },
});

const PracticesApi = {
  get: () =>
    DryEyeInstance({
      method: "GET",
      url: "/practices",
    }),
  create: (data: object) =>
    DryEyeInstance({
      method: "POST",
      url: "/practices",
      data,
    }),
  delete: (data: object) =>
    DryEyeInstance({
      method: "DELETE",
      url: "/practices",
      data,
    }),
};

const getEntityAPI = (id: string) => {
  switch (id) {
    case "practices":
      return PracticesApi;
  }
};

export default getEntityAPI;
