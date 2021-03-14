import { Entity } from "../types/interfaces/entities";

const entities: Entity[] = [
  {
    id: "practices",
    label: "Medical Practices",
    route: "/practices",
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
    fieldSet: [
      {
        id: "doctor",
        label: "Doctor",
        placeholder: "Enter the customer ID",
        type: "text",
        group: "addressInformation",
      },
      {
        id: "name",
        label: "Name",
        placeholder: "Name",
        type: "text",
        group: "addressInformation",
      },
      {
        id: "address",
        label: "Address",
        placeholder: "Address",
        type: "addressAutocomplete",
        group: "addressInformation",
      },
      {
        id: "phone",
        label: "Phone",
        placeholder: "Phone",
        type: "tel",
        mask: "phone",
        group: "addressInformation",
      },
      {
        id: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        group: "addressInformation",
      },
      {
        id: "website",
        label: "Website",
        placeholder: "Website",
        type: "text",
        group: "addressInformation",
      },
      {
        id: "facebook_url",
        label: "Facebook URL",
        placeholder: "Facebook URL",
        type: "text",
        group: "socialMedia",
      },
      {
        id: "instagram_url",
        label: "Instagram URL",
        placeholder: "Instagram URL",
        type: "text",
        group: "socialMedia",
      },
      {
        id: "twitter_url",
        label: "Twitter URL",
        placeholder: "Twitter URL",
        type: "text",
        group: "socialMedia",
      },
      {
        id: "monday_op_hours",
        label: "Monday opening hours",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "tuesday_op_hours",
        label: "Tuesday opening hours",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "wednesday_op_hours",
        label: "Wednesday opening hours",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "thursday_op_hours",
        label: "Thursday opening hours",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "friday_op_hours",
        label: "Friday opening hours",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "saturday_op_hours",
        label: "Saturday opening hours",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "sunday_op_hours",
        label: "Sunday opening hours",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
    ],
    fieldSetGroups: [
      { id: "addressInformation", label: "Address Information" },
      { id: "socialMedia", label: "Social Media" },
      { id: "openingHours", label: "Opening Hours" },
    ],
    lang: {
      dashboard: {
        title: "Medical Practices",
        searchBar: "Search for medical practices",
        addEntityButton: "Add medical practice",
      },
      form: {
        createEntityTitle: "Create medical practice",
        createEntityButton: "Create",
        updateEntityTitle: (name) => `Update practice ${name}`,
        updateEntityButton: "Save",
      },
      dialogs: {
        deleteEntityTitle: "Delete practice",
        deleteEntityDescription:
          "Are you sure? You can't undo this action afterwards.",
      },
      userFeedback: {
        entityCreatedTitle: "Practice created.",
        entityCreatedDescription: (name) =>
          `The practice ${name} has been created.`,
        entityUpdatedTitle: "Practice updated.",
        entityUpdatedDescription: (name) =>
          `The practice ${name} has been created.`,
        entityDeletedTitle: "Practice deleted.",
        entityDeletedDescription: (name) =>
          `The practice ${name} has been deleted.`,
      },
    },
  },
  {
    id: "doctors",
    label: "Doctors",
    route: "/doctors",
    columns: [],
    fieldSet: [],
    fieldSetGroups: [],
    lang: {
      dashboard: {
        title: "",
        searchBar: "",
        addEntityButton: "",
      },
      form: {
        createEntityTitle: "",
        createEntityButton: "",
        updateEntityTitle: (name) => ``,
        updateEntityButton: "",
      },
      dialogs: {
        deleteEntityTitle: "",
        deleteEntityDescription: "",
      },
      userFeedback: {
        entityCreatedTitle: "",
        entityCreatedDescription: (name) => ``,
        entityUpdatedTitle: "",
        entityUpdatedDescription: (name) => ``,
        entityDeletedTitle: "",
        entityDeletedDescription: (name) => ``,
      },
    },
  },
  {
    id: "patients",
    label: "Patients",
    route: "/patients",
    columns: [],
    fieldSet: [],
    fieldSetGroups: [],
    lang: {
      dashboard: {
        title: "",
        searchBar: "",
        addEntityButton: "",
      },
      form: {
        createEntityTitle: "",
        createEntityButton: "",
        updateEntityTitle: (name) => ``,
        updateEntityButton: "",
      },
      dialogs: {
        deleteEntityTitle: "",
        deleteEntityDescription: "",
      },
      userFeedback: {
        entityCreatedTitle: "",
        entityCreatedDescription: (name) => ``,
        entityUpdatedTitle: "",
        entityUpdatedDescription: (name) => ``,
        entityDeletedTitle: "",
        entityDeletedDescription: (name) => ``,
      },
    },
  },
];

export default entities;
