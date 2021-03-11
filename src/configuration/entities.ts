import { Entity } from "../types/interfaces/entities";

const entities: Entity[] = [
  {
    id: "practices",
    label: "Practices",
    route: "/practices",
    data: {
      get: "practices",
      create: "/practices",
      update: "/practices",
      delete: "/practices",
    },
    columns: [
      {
        column: "name",
        label: "Name",
        type: "text",
        sort: true,
      },
      {
        column: "address",
        label: "Address",
        type: "text",
        sort: true,
      },
      {
        column: "city",
        label: "City",
        type: "text",
        sort: true,
      },
      {
        column: "state",
        label: "State",
        type: "text",
        sort: true,
      },
      {
        column: "zip",
        label: "Zip",
        type: "text",
        sort: true,
      },
    ],
  },
  {
    id: "doctors",
    label: "Doctors",
    route: "/doctors",
    data: {
      get: "doctors",
      create: "",
      update: "",
      delete: "",
    },
    columns: [],
  },
  {
    id: "patients",
    label: "Patients",
    route: "/patients",
    data: {
      get: "",
      create: "",
      update: "",
      delete: "",
    },
    columns: [],
  },
];

export default entities;
