import { Entity } from "../types/interfaces/entities";

const entities: Entity[] = [
  {
    id: "practices",
    label: "Medical Practices",
    route: "/practices",
    columnsKey: "practice",
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
        placeholder: "Select a doctor",
        type: "selectAutocomplete",
        list: "customers",
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
        searchBar: "Name, address or ZIP",
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
    columnsKey: "doctor",
    columns: [
      {
        column: "firstName",
        label: "First Name",
        type: "text",
        sort: true,
      },
      {
        column: "lastName",
        label: "Last Name",
        type: "text",
        sort: true,
      },
      {
        column: "owner",
        label: "Created by",
        type: "text",
        sort: true,
      },
      {
        column: "practice",
        label: "Practice",
        type: "text",
        sort: true,
      },
    ],
    fieldSet: [
      {
        id: "firstName",
        label: "First name",
        placeholder: "Doctor's first name",
        type: "text",
        group: "general",
      },
      {
        id: "lastName",
        label: "Last name",
        placeholder: "Doctor's last name",
        type: "text",
        group: "general",
      },
      {
        id: "owner",
        label: "Owner",
        placeholder: "Select a doctor",
        type: "selectAutocomplete",
        list: "customers",
        group: "general",
      },
      {
        id: "practice",
        label: "Practice",
        placeholder: "Select a practice",
        type: "selectAutocomplete",
        list: "practices",
        dependsOf: "customers",
        group: "general",
      },
    ],
    fieldSetGroups: [{ id: "general", label: "General information" }],
    lang: {
      dashboard: {
        title: "Doctors",
        searchBar: "Name, address or practice",
        addEntityButton: "Add doctor",
      },
      form: {
        createEntityTitle: "Create doctor",
        createEntityButton: "Create",
        updateEntityTitle: (name) => `Update doctor ${name}`,
        updateEntityButton: "Save",
      },
      dialogs: {
        deleteEntityTitle: "Delete doctor",
        deleteEntityDescription:
          "Are you sure? You can't undo this action afterwards.",
      },
      userFeedback: {
        entityCreatedTitle: "Doctor created.",
        entityCreatedDescription: (name) =>
          `The doctor ${name} has been created.`,
        entityUpdatedTitle: "Doctor updated.",
        entityUpdatedDescription: (name) =>
          `The doctor ${name} has been updated.`,
        entityDeletedTitle: "Doctor deleted",
        entityDeletedDescription: (name) =>
          `The doctor ${name} has been deleted.`,
      },
    },
  },
  {
    id: "patients",
    label: "Patients",
    route: "/patients",
    columnsKey: "patient",
    columns: [
      {
        column: "firstName",
        label: "First Name",
        type: "text",
        sort: true,
      },
      {
        column: "lastName",
        label: "Last Name",
        type: "text",
        sort: true,
      },
      {
        column: "address",
        label: "Street Address",
        type: "text",
        sort: true,
      },
      {
        column: "address2",
        label: "Apartment, suite, etc.",
        type: "text",
        sort: true,
      },
      {
        column: "email",
        label: "Email",
        type: "text",
        sort: true,
      },
    ],
    fieldSet: [
      {
        id: "user",
        label: "Doctor",
        placeholder: "Select a doctor",
        type: "selectAutocomplete",
        list: "customers",
        group: "general",
      },
      {
        id: "firstName",
        label: "First name",
        placeholder: "First name",
        type: "text",
        group: "general",
      },
      {
        id: "lastName",
        label: "Last name",
        placeholder: "Last name",
        type: "text",
        group: "general",
      },
      {
        id: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        group: "general",
      },
      {
        id: "phone",
        label: "Phone",
        placeholder: "Phone",
        type: "tel",
        group: "general",
      },
      {
        id: "address",
        label: "Street Address",
        placeholder: "Street Address ",
        type: "text",
        group: "addressInformation",
      },
      {
        id: "address2",
        label: "Apartment, suite, etc",
        placeholder: "Apartment, suite, etc",
        type: "text",
        group: "addressInformation",
      },
      {
        id: "city",
        label: "City",
        placeholder: "City",
        type: "text",
        group: "addressInformation",
      },
      {
        id: "state",
        label: "State",
        placeholder: "State",
        type: "text",
        group: "addressInformation",
      },
      {
        id: "zip",
        label: "Zip",
        placeholder: "Zip",
        type: "text",
        group: "addressInformation",
      },
    ],
    fieldSetGroups: [
      { id: "general", label: "General" },
      { id: "addressInformation", label: "Address Information" },
    ],
    lang: {
      dashboard: {
        title: "Patients",
        searchBar: "Name, address, practice or email",
        addEntityButton: "Add patient",
      },
      form: {
        createEntityTitle: "Create patient",
        createEntityButton: "Create",
        updateEntityTitle: (name) => `Update patient ${name}`,
        updateEntityButton: "Save",
      },
      dialogs: {
        deleteEntityTitle: "Delete patient",
        deleteEntityDescription:
          "Are you sure? You can't undo this action afterwards.",
      },
      userFeedback: {
        entityCreatedTitle: "Patient created.",
        entityCreatedDescription: (name) =>
          `The patient ${name} has been created.`,
        entityUpdatedTitle: "Patient updated.",
        entityUpdatedDescription: (name) =>
          `The patient ${name} has been updated.`,
        entityDeletedTitle: "Patient deleted.",
        entityDeletedDescription: (name) =>
          `The patient ${name} has been deleted.`,
      },
    },
  },
];

export default entities;
