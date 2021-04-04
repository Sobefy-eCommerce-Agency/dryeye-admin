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
      {
        column: "doctorName",
        label: "Created by",
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
        id: "suite_number",
        label: "Suite or Office number",
        placeholder: "Suit, building, floor, etc.",
        type: "text",
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
        id: "eyeCareServices",
        type: "checkboxGroup",
        fieldOptions: [
          {
            value: "Prescription Eyewear",
            label: "Prescription Eyewear",
          },
          {
            value: "Routine Eye Exam",
            label: "Routine Eye Exam",
          },
          {
            value: "Full Dry Eye Evaluation",
            label: "Full Dry Eye Evaluation",
          },
        ],
        group: "eyeCareServices",
      },
      {
        id: "dryEyeTreatments",
        type: "checkboxGroup",
        fieldOptions: [
          {
            value: "AB Max",
            label: "AB Max",
          },
          {
            value: "Blephex",
            label: "Blephex",
          },
          {
            value: "Eyelid Debridement",
            label: "Eyelid Debridement",
          },
          {
            value: "iLUX",
            label: "iLUX",
          },
          {
            value: "Intense Pulse Light",
            label: "Intense Pulse Light",
          },
          {
            value: "Lipiflow",
            label: "Lipiflow",
          },
          {
            value: "Sciton BBL",
            label: "Sciton BBL",
          },
          {
            value: "Thermal 1 Touch",
            label: "Thermal 1 Touch",
          },
          {
            value: "Zest Treatment",
            label: "Zest Treatment",
          },
          {
            value: "Zest ZocuKit",
            label: "Zest ZocuKit",
          },
          {
            value: "ZocuWipe",
            label: "ZocuWipe",
          },
        ],
        group: "dryEyeTreatments",
      },
      {
        id: "dryEyeProducts",
        placeholder: "Products separated by commas",
        type: "textArea",
        group: "dryEyeProducts",
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
        label: "Monday",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "tuesday_op_hours",
        label: "Tuesday",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "wednesday_op_hours",
        label: "Wednesday",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "thursday_op_hours",
        label: "Thursday",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "friday_op_hours",
        label: "Friday",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "saturday_op_hours",
        label: "Saturday",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
      {
        id: "sunday_op_hours",
        label: "Sunday",
        placeholder: "8:00am - 5:00pm",
        type: "text",
        group: "openingHours",
      },
    ],
    fieldSetGroups: [
      { id: "addressInformation", label: "Address Information", columns: 3 },
      { id: "eyeCareServices", label: "Eye Care Services", columns: 1 },
      { id: "dryEyeTreatments", label: "DryEye Treatments", columns: 1 },
      { id: "dryEyeProducts", label: "DryEye Products", columns: 1 },
      { id: "socialMedia", label: "Social Media", columns: 3 },
      { id: "openingHours", label: "Hours of operation", columns: 3 },
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
          `The practice ${name} has been updated.`,
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
        column: "practiceName",
        label: "Practice",
        type: "text",
        sort: true,
      },
      {
        column: "doctorName",
        label: "Created by",
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
    fieldSetGroups: [
      { id: "general", label: "General information", columns: 3 },
    ],
    lang: {
      dashboard: {
        title: "Doctors",
        searchBar: "Name, address, created by or practice",
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
        column: "email",
        label: "Email",
        type: "text",
        sort: true,
      },
      {
        column: "doctorName",
        label: "Created by",
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
      { id: "general", label: "General", columns: 3 },
      { id: "addressInformation", label: "Address Information", columns: 3 },
    ],
    lang: {
      dashboard: {
        title: "Patients",
        searchBar: "Name, address, practice, created by or email",
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
