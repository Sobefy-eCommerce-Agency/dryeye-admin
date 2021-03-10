const entities = {
  patients: {
    actions: {
      list: true,
      view: true,
      create: true,
      update: true,
      delete: true,
      search: true,
    },
    data: {
      get: "/practices",
      create: "/practices",
      update: "/practices",
      delete: "/practices",
    },
  },
};

export default entities;
