import {
  CPF_REGEX,
  CNPJ_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  CEP_REGEX,
  ERROR_MESSAGES,
} from './constants';

export const validateEmail = (email: string): string | null => {
  if (!email) return ERROR_MESSAGES.required;
  if (!EMAIL_REGEX.test(email)) return ERROR_MESSAGES['email.invalid'];
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return ERROR_MESSAGES.required;
  if (!PASSWORD_REGEX.test(password)) return ERROR_MESSAGES['password.weak'];
  return null;
};

export const validatePasswordConfirmation = (
  password: string,
  confirmation: string
): string | null => {
  if (!confirmation) return ERROR_MESSAGES.required;
  if (password !== confirmation) return ERROR_MESSAGES['password.mismatch'];
  return null;
};

export const validateEmailConfirmation = (email: string, confirmation: string): string | null => {
  if (!confirmation) return ERROR_MESSAGES.required;
  if (email !== confirmation) return ERROR_MESSAGES['email.mismatch'];
  return null;
};

export const validateCPF = (cpf: string): string | null => {
  if (!cpf) return ERROR_MESSAGES.required;
  
  const cleanCpf = cpf.replace(/\D/g, '');
  
  if (cleanCpf.length !== 11) return ERROR_MESSAGES['cpf.invalid'];
  
  const invalidCpfs = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];
  
  if (invalidCpfs.includes(cleanCpf)) return ERROR_MESSAGES['cpf.invalid'];
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCpf.charAt(9))) return ERROR_MESSAGES['cpf.invalid'];
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCpf.charAt(10))) return ERROR_MESSAGES['cpf.invalid'];
  
  return null;
};

export const validateCNPJ = (cnpj: string): string | null => {
  if (!cnpj) return ERROR_MESSAGES.required;
  
  const cleanCnpj = cnpj.replace(/\D/g, '');
  
  if (cleanCnpj.length !== 14) return ERROR_MESSAGES['cnpj.invalid'];
  
  if (/^(\d)\1+$/.test(cleanCnpj)) return ERROR_MESSAGES['cnpj.invalid'];
  
  let length = cleanCnpj.length - 2;
  let numbers = cleanCnpj.substring(0, length);
  const digits = cleanCnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return ERROR_MESSAGES['cnpj.invalid'];
  
  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return ERROR_MESSAGES['cnpj.invalid'];
  
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return ERROR_MESSAGES.required;
  if (!PHONE_REGEX.test(phone)) return ERROR_MESSAGES['phone.invalid'];
  return null;
};

export const validateCEP = (cep: string): string | null => {
  if (!cep) return ERROR_MESSAGES.required;
  if (!CEP_REGEX.test(cep)) return ERROR_MESSAGES['cep.invalid'];
  return null;
};

export const validateRequired = (value: string | boolean): string | null => {
  if (!value) return ERROR_MESSAGES.required;
  return null;
};

export const validateAge = (birthDate: string): string | null => {
  if (!birthDate) return ERROR_MESSAGES.required;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  if (age < 18) return ERROR_MESSAGES['age.minimum'];
  return null;
};

export const validateTerms = (accepted: boolean): string | null => {
  if (!accepted) return ERROR_MESSAGES['terms.required'];
  return null;
};
