export type Doctors = {
  [x: string]: string | number | undefined;
  entityName: "doctors";
  doctor?: string;
  practice?: string;
  owner?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: number;
};
