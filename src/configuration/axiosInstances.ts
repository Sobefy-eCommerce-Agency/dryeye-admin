import axios from "axios";
import { EntityType } from "../types/commons/commons";

const DryEyeInstance = axios.create({
  baseURL: "https://api.dryeyerescue.com",
  headers: {
    "content-type": "application/json",
  },
});

const ShopifyPublicInstance = axios.create({
  baseURL: "https://shop.dryeyerescue.com",
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
        ? "/practices?all_doctors=true&total_spent=true&treatments=true&activeOnly=true"
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

export const DoctorsApi = {
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

export const ServicesApi = {
  get: (type?: "treatment" | "service" | "test") =>
    DryEyeInstance({
      method: "GET",
      url: `/services-and-treatments${type ? `?type=${type}` : ""}`,
    }),
  create: (data: object) =>
    DryEyeInstance({
      method: "POST",
      url: "/services-and-treatments",
      data,
    }),
  update: (data: object) =>
    DryEyeInstance({
      method: "PUT",
      url: "/services-and-treatments",
      data,
    }),
  delete: (data: object) =>
    DryEyeInstance({
      method: "DELETE",
      url: "/services-and-treatments",
      data,
    }),
};

export const CustomersApi = {
  get: () =>
    DryEyeInstance({
      method: "GET",
      url: "/customers",
    }),
};

export const ShopifyPublicApi = {
  getProducts: () =>
    ShopifyPublicInstance({
      method: "GET",
      url: "/products.json?limit=250&page=1",
    }),
};

export const getEntityAPI = (entity: EntityType) => {
  switch (entity) {
    case "practices":
      return PracticesApi;
    case "doctors":
      return DoctorsApi;
    case "patients":
      return PatientsApi;
    case "services":
      return ServicesApi;
  }
};
