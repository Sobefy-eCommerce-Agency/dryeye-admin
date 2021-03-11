import { Role } from "../types/interfaces/roles";

const roles: Role[] = [
  {
    role: "administrator",
    entities: [
      {
        id: "practices",
        actions: {
          view: true,
          create: true,
          update: true,
          remove: true,
          search: true,
        },
      },
    ],
  },
];

export default roles;
