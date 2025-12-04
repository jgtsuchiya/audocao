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

// Animal Types
export type AnimalType = 'dog' | 'cat' | 'other';
export type AnimalAge = 'puppy' | 'adult' | 'senior';
export type AnimalSize = 'small' | 'medium' | 'large';
export type AnimalGender = 'male' | 'female';
export type AnimalStatus = 'available' | 'in_process' | 'adopted';

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  breed: string;
  age: AnimalAge;
  ageInYears: number;
  size: AnimalSize;
  gender: AnimalGender;
  status: AnimalStatus;
  photo: string;
  description: string;
  healthInfo: string;
  adoptionProcess: string;
  personality: string[];
  vaccinated: boolean;
  neutered: boolean;
  specialNeeds?: string;
  donorId: string;
  createdAt: Date;
}

export interface AnimalFilters {
  type?: AnimalType;
  age?: AnimalAge;
  size?: AnimalSize;
  gender?: AnimalGender;
}

// Adoption Request Types
export interface AdoptionRequest {
  id: string;
  animalId: string;
  adopterName: string;
  adopterEmail: string;
  adopterPhone: string;
  adopterAddress: Address;
  adoptionReason: string;
  monthlyIncome: string;
  hasChildren: boolean;
  childrenAges?: string;
  hasExperience: boolean;
  experienceDetails?: string;
  allResidentsAgree: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface AdoptionRequestFormData {
  name: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  adoptionReason: string;
  monthlyIncome: string;
  hasChildren: boolean;
  childrenAges?: string;
  hasExperience: boolean;
  experienceDetails?: string;
  allResidentsAgree: boolean;
  acceptTerms: boolean;
}
