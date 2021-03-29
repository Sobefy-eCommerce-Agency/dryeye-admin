export type Patients = {
  [x: string]: string | number | undefined;
  entityName: "patients";
  patient?: string;
  user?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  createdAt?: number;
};
