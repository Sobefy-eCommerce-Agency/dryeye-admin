import { Product } from "../commons/commons";
import { Doctors } from "./doctors";

export type Practice = {
  [x: string]: string | number | any[] | boolean | undefined;
  practice?: string;
  doctor: string;
  doctorName?: string;
  doctors?: Doctors[];
  name: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  street_number?: string;
  suite_number?: string;
  route?: string;
  county?: string;
  state?: string;
  state_short?: string;
  city?: string;
  country?: string;
  country_short?: string;
  zip?: string;
  latitude?: string | number;
  longitude?: string | number;
  createdAt?: number;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  monday_op_hours: string;
  tuesday_op_hours: string;
  wednesday_op_hours: string;
  thursday_op_hours: string;
  friday_op_hours: string;
  saturday_op_hours: string;
  sunday_op_hours: string;
  dryEyeProducts: Product[] | string;
  eyeCareServices: any[];
  dryEyeTreatments: any[];
  preferred: boolean;
};

export type AddressComponent = {
  [x: string]: string | number | undefined;
  address?: string;
  street_number?: string;
  route?: string;
  county?: string;
  state?: string;
  state_short?: string;
  city?: string;
  country?: string;
  country_short?: string;
  zip?: string;
  latitude?: string | number;
  longitude?: string | number;
};
