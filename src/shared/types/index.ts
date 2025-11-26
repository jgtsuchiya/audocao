export type UserType = 'donor' | 'adopter';
export type DonorType = 'person' | 'institution';

export interface User {
  id: string;
  email: string;
  password: string;
  type: UserType;
  approved: boolean;
  createdAt: Date;
}

export interface DonorPerson extends User {
  type: 'donor';
  donorType: 'person';
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  address: Address;
}

export interface DonorInstitution extends User {
  type: 'donor';
  donorType: 'institution';
  institutionName: string;
  cnpj: string;
  activityArea: string;
  institutionPhone: string;
  website?: string;
  responsibleName: string;
  responsibleCpf: string;
  responsibleRole: string;
  responsiblePhone: string;
  address: Address;
}

export interface Adopter extends User {
  type: 'adopter';
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  maritalStatus: string;
  occupation: string;
  address: Address;
  housingInfo: HousingInfo;
}

export interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface HousingInfo {
  residenceType: 'house' | 'apartment';
  ownership: 'owned' | 'rented';
  hasYard: boolean;
  isScreened: boolean;
  hasOtherAnimals: boolean;
  otherAnimalsDetails?: string;
}

export interface RegisterDonorPersonFormData {
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
}

export interface RegisterDonorInstitutionFormData {
  institutionName: string;
  cnpj: string;
  activityArea: string;
  institutionPhone: string;
  website?: string;
  responsibleName: string;
  responsibleCpf: string;
  responsibleRole: string;
  responsiblePhone: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
}

export interface RegisterAdopterFormData {
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  maritalStatus: string;
  occupation: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  residenceType: 'house' | 'apartment';
  ownership: 'owned' | 'rented';
  hasYard: boolean;
  isScreened: boolean;
  hasOtherAnimals: boolean;
  otherAnimalsDetails?: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  userId: string;
  userType: UserType;
}
