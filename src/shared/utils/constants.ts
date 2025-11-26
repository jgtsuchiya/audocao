export const BRASIL_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const ACTIVITY_AREAS = [
  { value: 'ong', label: 'ONG' },
  { value: 'abrigo', label: 'Abrigo' },
  { value: 'veterinaria', label: 'Clínica Veterinária' },
  { value: 'pet_shop', label: 'Pet Shop' },
  { value: 'outros', label: 'Outros' },
];

export const MARITAL_STATUS = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' },
  { value: 'uniao_estavel', label: 'União Estável' },
];

export const RESIDENCE_TYPES = [
  { value: 'house', label: 'Casa' },
  { value: 'apartment', label: 'Apartamento' },
];

export const OWNERSHIP_TYPES = [
  { value: 'owned', label: 'Própria' },
  { value: 'rented', label: 'Alugada' },
];

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\(\d{2}\) \d{4,5}-\d{4}$/;
export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const CEP_REGEX = /^\d{5}-\d{3}$/;

export const ERROR_MESSAGES = {
  required: 'Este campo é obrigatório',
  'email.invalid': 'E-mail inválido',
  'email.mismatch': 'Os e-mails não conferem',
  'email.exists': 'Este e-mail já está cadastrado',
  'password.weak':
    'A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais',
  'password.mismatch': 'As senhas não conferem',
  'cpf.invalid': 'CPF inválido',
  'cnpj.invalid': 'CNPJ inválido',
  'phone.invalid': 'Telefone inválido',
  'cep.invalid': 'CEP inválido',
  'age.minimum': 'É necessário ter no mínimo 18 anos',
  'terms.required': 'Você deve aceitar os termos de uso',
  'auth.invalid': 'E-mail ou senha incorretos',
  'auth.unauthorized': 'Você precisa estar logado para acessar esta página',
  'network.error': 'Erro de conexão. Tente novamente.',
  'server.error': 'Erro no servidor. Tente novamente mais tarde.',
};

export const SUCCESS_MESSAGES = {
  'register.success': 'Cadastro realizado com sucesso!',
  'login.success': 'Login realizado com sucesso!',
};

export const INFO_MESSAGES = {
  'register.pending':
    'Seu cadastro está em análise. Você receberá um e-mail em até 48 horas.',
  'password.requirements':
    'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais',
  'cep.loading': 'Buscando endereço...',
};
