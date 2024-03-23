import moment from "moment";

export interface PersonFormData {
  prefix: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  nationality: string;
  idCard: string;
  gender: 'male' | 'female' | 'unspecified';
  phoneCountryCode: string;
  phoneNumber: string;
  passport: string;
  salary: Number;
}
