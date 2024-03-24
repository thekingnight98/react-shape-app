import moment from "moment";

export interface PersonFormData {
  prefix: string;
  firstName: string;
  lastName: string;
  birthdate: moment.Moment | string; 
  nationality: string;
  idCard: string;
  gender: 'male' | 'female' | 'unspecified';
  phoneCountryCode: string;
  phoneNumber: string;
  passport: string;
  salary: number;
}
