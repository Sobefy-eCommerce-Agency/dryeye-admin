import axios from "axios";

const DryEyeInstance = axios.create({
  baseURL: "https://api.dryeyerescue.com",
  headers: {
    "content-type": "application/json",
  },
});

export const PracticesApi = {
  get: (id?: string, allDoctors?: boolean) =>
    DryEyeInstance({
      method: "GET",
      url: id
        ? `/practices?doctor=${id}`
        : allDoctors
        ? "/practices?all_doctors=true"
        : "/practices",
    }),
  create: (data: object) =>
    DryEyeInstance({
      method: "POST",
      url: "/practices",
      data,
    }),
  update: (data: object) =>
    DryEyeInstance({
      method: "PUT",
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

const DoctorsApi = {
  get: () =>
    DryEyeInstance({
      method: "GET",
      url: "/my-doctors",
    }),
  create: (data: object) =>
    DryEyeInstance({
      method: "POST",
      url: "/my-doctors",
      data,
    }),
  update: (data: object) =>
    DryEyeInstance({
      method: "PUT",
      url: "/my-doctors",
      data,
    }),
  delete: (data: object) =>
    DryEyeInstance({
      method: "DELETE",
      url: "/my-doctors",
      data,
    }),
};

const PatientsApi = {
  get: () =>
    DryEyeInstance({
      method: "GET",
      url: "/patients",
    }),
  create: (data: object) =>
    DryEyeInstance({
      method: "POST",
      url: "/patients",
      data,
    }),
  update: (data: object) =>
    DryEyeInstance({
      method: "PUT",
      url: "/patients/update",
      data,
    }),
  delete: (data: object) =>
    DryEyeInstance({
      method: "DELETE",
      url: "/patients/delete",
      data,
    }),
};

export const CustomersApi = {
  get: (id?: string) =>
    DryEyeInstance({
      method: "GET",
      url: "/customers",
    }),
};

export const getEntityAPI = (id: string) => {
  switch (id) {
    case "practices":
      return PracticesApi;
    case "doctors":
      return DoctorsApi;
    case "patients":
      return PatientsApi;
  }
};
