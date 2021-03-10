const roles = {
  administrator: {
    entities: [
      {
        entity: "patients",
        actions: {
          list: true,
          view: true,
          create: true,
          update: true,
          delete: true,
          search: true,
        },
      },
    ],
  },
};

export default roles;
