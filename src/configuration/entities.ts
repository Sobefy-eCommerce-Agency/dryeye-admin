const entities = [
  {
    id: "practices",
    label: "Practices",
    route: "/practices",
    data: {
      get: "/practices",
      create: "/practices",
      update: "/practices",
      delete: "/practices",
    },
    columns: [
      {
        column: "practice",
        label: "ID",
        type: "text",
        sort: true,
      },
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
    ],
  },
  {
    id: "doctors",
    label: "Doctors",
    route: "/doctors",
  },
  {
    id: "patients",
    label: "Patients",
    route: "/patients",
  },
];

export default entities;
