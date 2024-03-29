export type Doctors = {
  [x: string]: string | number | string[] | undefined;
  doctor?: string;
  practice?: string;
  owner?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: number;
  profilePicture?: string[];
};
