# Documentação de Requisitos - Sistema de Adoção

## 1. Visão Geral

### 1.1 Objetivo
Sistema web para gerenciamento de adoção de animais, conectando doadores (instituições e pessoas físicas) com potenciais adotantes.

### 1.2 Stack Tecnológica
- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript
- **Arquitetura**: Clean Architecture
- **Princípios**: Clean Code, SOLID
- **UI Library**: Ant Design
- **Ícones**: Material Icons
- **Segurança**: Implementação de validações e criptografia
- **Dados**: Mock (frontend apenas)

### 1.3 Heurísticas de Nielsen Aplicadas
1. **Visibilidade do status do sistema**: Feedbacks claros em todas as ações
2. **Correspondência entre o sistema e o mundo real**: Linguagem familiar ao usuário
3. **Controle e liberdade do usuário**: Opções de cancelar/voltar sempre disponíveis
4. **Consistência e padrões**: Design system unificado (Ant Design)
5. **Prevenção de erros**: Validações em tempo real
6. **Reconhecimento em vez de memorização**: Interface intuitiva e clara
7. **Flexibilidade e eficiência de uso**: Atalhos e navegação otimizada
8. **Design estético e minimalista**: Interface limpa e focada
9. **Ajuda aos usuários no reconhecimento, diagnóstico e recuperação de erros**: Mensagens de erro claras e acionáveis
10. **Ajuda e documentação**: Tooltips e orientações contextuais

---

## 2. Requisitos Funcionais

### 2.1 RF001 - Tela Inicial (Landing Page)

**Descrição**: Página inicial do sistema apresentando as funcionalidades principais.

**Critérios de Aceite**:
- [ ] Exibir hero section com título, subtítulo e call-to-action
- [ ] Apresentar cards com as principais funcionalidades:
  - Adotar um animal
  - Doar um animal
  - Sobre o projeto
- [ ] Botões de ação: "Entrar" e "Cadastrar-se"
- [ ] Menu de navegação fixo no topo
- [ ] Footer com informações de contato
- [ ] Design responsivo (mobile, tablet, desktop)
- [ ] Animações suaves de entrada (fade-in)
- [ ] Cards com animais em destaque (mock data)

**Componentes**:
- `HomePage`
- `Header`
- `HeroSection`
- `FeatureCard`
- `Footer`

**Rotas**:
- `/` - Tela inicial

---

### 2.2 RF002 - Login

**Descrição**: Tela de autenticação para usuários já cadastrados.

**Critérios de Aceite**:
- [ ] Formulário com campos:
  - E-mail (validação de formato)
  - Senha (campo com toggle show/hide)
- [ ] Botão "Entrar"
- [ ] Link "Esqueci minha senha"
- [ ] Link "Não tem conta? Cadastre-se"
- [ ] Validação em tempo real dos campos
- [ ] Mensagens de erro específicas (e-mail inválido, senha incorreta, etc.)
- [ ] Loading state durante autenticação
- [ ] Armazenar token de autenticação (localStorage - mock)
- [ ] Redirecionamento após login bem-sucedido para dashboard

**Componentes**:
- `LoginPage`
- `LoginForm`
- `Input` (reutilizável)
- `Button` (reutilizável)

**Rotas**:
- `/login`

**Mock Data**:
```typescript
const mockUsers = [
  { email: 'doador@email.com', password: 'Senha123!', type: 'doador' },
  { email: 'adotante@email.com', password: 'Senha123!', type: 'adotante' }
]
```

---

### 2.3 RF003 - Escolha de Tipo de Cadastro

**Descrição**: Tela para o usuário escolher se deseja se cadastrar como doador ou adotante.

**Critérios de Aceite**:
- [ ] Título explicativo: "Como você deseja se cadastrar?"
- [ ] Dois cards de seleção:
  - **Doador**: "Quero doar ou cadastrar animais para adoção"
  - **Adotante**: "Quero adotar um animal"
- [ ] Ícones representativos em cada card (Material Icons)
- [ ] Hover state nos cards
- [ ] Seleção visual clara do card escolhido
- [ ] Botão "Continuar" (habilitado apenas após seleção)
- [ ] Botão "Voltar" para retornar ao login
- [ ] Descrição breve de cada tipo de cadastro

**Componentes**:
- `RegisterTypePage`
- `SelectionCard`
- `Button`

**Rotas**:
- `/register/select-type`

---

### 2.4 RF004 - Escolha de Tipo de Doador

**Descrição**: Subtela para doadores escolherem entre cadastro como instituição ou pessoa física.

**Critérios de Aceite**:
- [ ] Exibida apenas se usuário escolheu "Doador" na etapa anterior
- [ ] Título explicativo: "Tipo de doador"
- [ ] Dois cards de seleção:
  - **Instituição**: "ONG, abrigo ou instituição"
  - **Pessoa Física**: "Pessoa física/tutor individual"
- [ ] Ícones representativos (Material Icons)
- [ ] Hover state e feedback visual de seleção
- [ ] Botão "Continuar"
- [ ] Botão "Voltar"

**Componentes**:
- `DonorTypePage`
- `SelectionCard`

**Rotas**:
- `/register/donor-type`

---

### 2.5 RF005 - Cadastro de Doador - Pessoa Física

**Descrição**: Formulário de cadastro para doadores pessoa física.

**Critérios de Aceite**:
- [ ] Formulário multi-step (steps visíveis no topo)
- [ ] **Step 1 - Dados Pessoais**:
  - Nome completo (obrigatório, min 3 caracteres)
  - CPF (obrigatório, validação de formato e dígitos)
  - Data de nascimento (obrigatório, idade mínima 18 anos)
  - Telefone (obrigatório, validação de formato)
- [ ] **Step 2 - Endereço**:
  - CEP (com busca automática)
  - Logradouro
  - Número
  - Complemento (opcional)
  - Bairro
  - Cidade
  - Estado (select)
- [ ] **Step 3 - Dados de Acesso**:
  - E-mail (validação de formato e unicidade)
  - Confirmação de e-mail
  - Senha (requisitos: min 8 caracteres, 1 maiúscula, 1 número, 1 caractere especial)
  - Confirmação de senha
  - Checkbox "Aceito os termos de uso"
- [ ] Indicador de progresso (1/3, 2/3, 3/3)
- [ ] Botões "Voltar" e "Próximo" / "Finalizar"
- [ ] Validação em tempo real de todos os campos
- [ ] Mensagens de erro específicas por campo
- [ ] Tooltip de ajuda nos campos com requisitos específicos
- [ ] Auto-save no localStorage (para não perder dados)

**Componentes**:
- `RegisterDonorPersonPage`
- `MultiStepForm`
- `PersonalDataForm`
- `AddressForm`
- `AccessDataForm`
- `ProgressIndicator`
- `Input`, `Select`, `Checkbox`

**Rotas**:
- `/register/donor/person`

---

### 2.6 RF006 - Cadastro de Doador - Instituição

**Descrição**: Formulário de cadastro para doadores institucionais.

**Critérios de Aceite**:
- [ ] Formulário multi-step
- [ ] **Step 1 - Dados da Instituição**:
  - Nome da instituição (obrigatório)
  - CNPJ (obrigatório, validação de formato)
  - Área de atuação (select: ONG, Abrigo, Veterinária, etc.)
  - Telefone institucional
  - Site (opcional, validação de URL)
- [ ] **Step 2 - Dados do Responsável**:
  - Nome do responsável
  - CPF do responsável
  - Cargo
  - Telefone do responsável
- [ ] **Step 3 - Endereço**:
  - Mesmos campos do cadastro de pessoa física
- [ ] **Step 4 - Dados de Acesso**:
  - E-mail institucional
  - Confirmação de e-mail
  - Senha
  - Confirmação de senha
  - Checkbox "Aceito os termos de uso"
- [ ] Indicador de progresso (1/4, 2/4, 3/4, 4/4)
- [ ] Validações em tempo real
- [ ] Botões navegação entre steps
- [ ] Auto-save no localStorage

**Componentes**:
- `RegisterDonorInstitutionPage`
- `MultiStepForm`
- `InstitutionDataForm`
- `ResponsibleDataForm`
- `AddressForm`
- `AccessDataForm`

**Rotas**:
- `/register/donor/institution`

---

### 2.7 RF007 - Cadastro de Adotante

**Descrição**: Formulário de cadastro para usuários que desejam adotar.

**Critérios de Aceite**:
- [ ] Formulário multi-step
- [ ] **Step 1 - Dados Pessoais**:
  - Nome completo
  - CPF
  - Data de nascimento
  - Telefone
  - Estado civil (select)
  - Profissão
- [ ] **Step 2 - Endereço**:
  - Campos padrão de endereço
- [ ] **Step 3 - Informações Sobre Moradia**:
  - Tipo de residência (select: casa, apartamento)
  - Residência própria ou alugada (radio)
  - Possui quintal? (checkbox)
  - Residência telada? (checkbox para apartamento)
  - Outros animais em casa? (radio)
  - Se sim: quais e quantos (textarea)
- [ ] **Step 4 - Dados de Acesso**:
  - E-mail
  - Confirmação de e-mail
  - Senha
  - Confirmação de senha
  - Checkbox "Aceito os termos de uso"
- [ ] Indicador de progresso (1/4, 2/4, 3/4, 4/4)
- [ ] Validações em tempo real
- [ ] Botões de navegação
- [ ] Auto-save

**Componentes**:
- `RegisterAdopterPage`
- `MultiStepForm`
- `PersonalDataForm`
- `AddressForm`
- `HousingInfoForm`
- `AccessDataForm`

**Rotas**:
- `/register/adopter`

---

### 2.8 RF008 - Tela de Confirmação de Registro

**Descrição**: Feedback visual após conclusão do cadastro.

**Critérios de Aceite**:
- [ ] Ícone de sucesso (Material Icons - check_circle)
- [ ] Título: "Cadastro realizado com sucesso!"
- [ ] Mensagem explicativa:
  - Para doadores: "Seu cadastro será analisado por nossa equipe. Você receberá um e-mail em até 48 horas com a confirmação de aprovação."
  - Para adotantes: "Seu cadastro foi aprovado! Agora você já pode navegar pelos animais disponíveis para adoção."
- [ ] Botão primário:
  - Para doadores: "Voltar para início"
  - Para adotantes: "Conhecer animais disponíveis"
- [ ] Animação de confete ou celebração (opcional)
- [ ] Enviar e-mail de confirmação (mock - apenas log no console)

**Componentes**:
- `RegistrationSuccessPage`
- `SuccessIcon`
- `Button`

**Rotas**:
- `/register/success`

---

## 3. Requisitos Não Funcionais

### 3.1 RNF001 - Performance
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] Lazy loading de componentes pesados
- [ ] Otimização de imagens (Next.js Image)
- [ ] Code splitting por rota

### 3.2 RNF002 - Responsividade
- [ ] Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- [ ] Touch-friendly (mínimo 44x44px para elementos clicáveis)
- [ ] Testes em diferentes dispositivos

### 3.3 RNF003 - Acessibilidade (WCAG 2.1 Level AA)
- [ ] Contraste de cores adequado (mínimo 4.5:1)
- [ ] Navegação por teclado completa
- [ ] ARIA labels em todos os elementos interativos
- [ ] Focus visible em todos os elementos focáveis
- [ ] Textos alternativos em imagens
- [ ] Formulários com labels associados

### 3.4 RNF004 - Segurança
- [ ] Validação de inputs (sanitização)
- [ ] Proteção contra XSS
- [ ] Headers de segurança configurados
- [ ] Criptografia de senhas (bcrypt - mock)
- [ ] Tokens JWT para autenticação (mock)
- [ ] Rate limiting simulado
- [ ] HTTPS (em produção)

### 3.5 RNF005 - Usabilidade
- [ ] Máximo de 3 cliques para qualquer ação principal
- [ ] Feedback visual imediato (<100ms)
- [ ] Mensagens de erro claras e acionáveis
- [ ] Tempo máximo de carregamento: 3s
- [ ] Interface intuitiva (teste com 5 usuários)

### 3.6 RNF006 - Manutenibilidade
- [ ] Cobertura de testes > 80% (Jest + React Testing Library)
- [ ] Documentação de componentes (Storybook)
- [ ] Código seguindo ESLint + Prettier
- [ ] Commits semânticos (Conventional Commits)
- [ ] README com instruções claras

---

## 4. Arquitetura e Estrutura de Pastas

### 4.1 Clean Architecture - Camadas

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group
│   │   ├── login/
│   │   └── register/
│   ├── layout.tsx
│   └── page.tsx
├── domain/                       # Entities e Business Rules
│   ├── entities/
│   │   ├── User.ts
│   │   ├── Donor.ts
│   │   ├── Adopter.ts
│   │   └── Animal.ts
│   └── usecases/
│       ├── auth/
│       │   ├── LoginUseCase.ts
│       │   └── RegisterUseCase.ts
│       └── validation/
│           └── ValidateFormUseCase.ts
├── application/                  # Use Cases e Interfaces
│   ├── interfaces/
│   │   └── repositories/
│   │       ├── IUserRepository.ts
│   │       └── IAuthRepository.ts
│   └── services/
│       ├── AuthService.ts
│       └── ValidationService.ts
├── infrastructure/               # Frameworks e Drivers
│   ├── repositories/
│   │   └── mock/
│   │       ├── MockUserRepository.ts
│   │       └── MockAuthRepository.ts
│   ├── http/
│   │   └── api/
│   │       └── mockApi.ts
│   └── storage/
│       └── LocalStorage.ts
├── presentation/                 # UI Components
│   ├── components/
│   │   ├── atoms/               # Componentes básicos
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Icon/
│   │   ├── molecules/           # Combinação de atoms
│   │   │   ├── FormField/
│   │   │   ├── Card/
│   │   │   └── SelectionCard/
│   │   ├── organisms/           # Componentes complexos
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── MultiStepForm/
│   │   │   └── LoginForm/
│   │   └── templates/           # Layout templates
│   │       ├── AuthLayout/
│   │       └── MainLayout/
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   └── useLocalStorage.ts
│   └── styles/
│       ├── theme.ts             # Ant Design theme
│       └── globals.css
├── shared/                       # Utilitários compartilhados
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   └── errors/
│       └── AppError.ts
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

### 4.2 Princípios SOLID Aplicados

**S - Single Responsibility Principle**
- Cada componente tem uma única responsabilidade
- Use cases separados por funcionalidade
- Serviços especializados

**O - Open/Closed Principle**
- Componentes extensíveis via props
- Interfaces para repositories
- Hooks customizados reutilizáveis

**L - Liskov Substitution Principle**
- Mock repositories implementam interfaces
- Componentes podem ser substituídos por variações

**I - Interface Segregation Principle**
- Interfaces específicas por domínio
- Props tipadas e segregadas

**D - Dependency Inversion Principle**
- Use cases dependem de interfaces, não de implementações
- Injeção de dependências via context/hooks

---

## 5. Componentes Reutilizáveis

### 5.1 Atoms

#### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
}
```

#### Input
```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'tel' | 'number';
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  mask?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}
```

#### Icon
```typescript
interface IconProps {
  name: string; // Material Icon name
  size: 'small' | 'medium' | 'large';
  color?: string;
}
```

### 5.2 Molecules

#### FormField
```typescript
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  tooltip?: string;
  children: ReactNode;
}
```

#### SelectionCard
```typescript
interface SelectionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}
```

### 5.3 Organisms

#### MultiStepForm
```typescript
interface Step {
  id: string;
  title: string;
  component: ReactNode;
  validation: () => boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onSubmit: () => void;
}
```

---

## 6. Validações

### 6.1 Validação de E-mail
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### 6.2 Validação de CPF
- Formato: 000.000.000-00
- Validação de dígitos verificadores
- Rejeitar CPFs conhecidos como inválidos (000.000.000-00, 111.111.111-11, etc.)

### 6.3 Validação de CNPJ
- Formato: 00.000.000/0000-00
- Validação de dígitos verificadores

### 6.4 Validação de Senha
- Mínimo 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 letra minúscula
- Pelo menos 1 número
- Pelo menos 1 caractere especial (@$!%*?&#)

### 6.5 Validação de Telefone
- Formato: (00) 00000-0000 ou (00) 0000-0000
- DDD válido (11-99)

### 6.6 Validação de CEP
- Formato: 00000-000
- Integração com API ViaCEP (mock)

---

## 7. Mock Data

### 7.1 Usuários Mock

```typescript
const mockUsers = [
  {
    id: '1',
    email: 'doador@email.com',
    password: 'Senha123!', // Em produção: hash bcrypt
    type: 'donor',
    donorType: 'person',
    name: 'João Silva',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    approved: true
  },
  {
    id: '2',
    email: 'ong@email.com',
    password: 'Senha123!',
    type: 'donor',
    donorType: 'institution',
    institutionName: 'ONG Patinhas Felizes',
    cnpj: '12.345.678/0001-00',
    approved: false
  },
  {
    id: '3',
    email: 'adotante@email.com',
    password: 'Senha123!',
    type: 'adopter',
    name: 'Maria Santos',
    cpf: '987.654.321-00',
    approved: true
  }
];
```

### 7.2 Estados Mock

```typescript
const states = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  // ... todos os estados
  { value: 'SP', label: 'São Paulo' },
];
```

---

## 8. Rotas e Navegação

### 8.1 Mapa de Rotas

```
/ ──────────────────────────────────── Tela inicial (pública)
│
├─ /login ──────────────────────────── Login (pública)
│
├─ /register ───────────────────────── Redirecionamento para /register/select-type
│   │
│   ├─ /select-type ────────────────── Escolha: Doador ou Adotante
│   │
│   ├─ /donor-type ─────────────────── Escolha: Instituição ou Pessoa Física
│   │
│   ├─ /donor
│   │   ├─ /person ─────────────────── Cadastro Doador PF
│   │   └─ /institution ────────────── Cadastro Doador PJ
│   │
│   ├─ /adopter ────────────────────── Cadastro Adotante
│   │
│   └─ /success ────────────────────── Confirmação de registro
│
└─ /dashboard ──────────────────────── Dashboard (protegida)
```

### 8.2 Proteção de Rotas

```typescript
// Middleware para rotas protegidas
const protectedRoutes = ['/dashboard', '/profile'];
const authRoutes = ['/login', '/register'];

// Se logado e tenta acessar auth -> redireciona para dashboard
// Se não logado e tenta acessar protegida -> redireciona para login
```

---

## 9. Mensagens de Feedback

### 9.1 Mensagens de Erro

```typescript
const errorMessages = {
  // Validação
  'required': 'Este campo é obrigatório',
  'email.invalid': 'E-mail inválido',
  'email.mismatch': 'Os e-mails não conferem',
  'password.weak': 'A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais',
  'password.mismatch': 'As senhas não conferem',
  'cpf.invalid': 'CPF inválido',
  'cnpj.invalid': 'CNPJ inválido',
  'phone.invalid': 'Telefone inválido',
  'cep.invalid': 'CEP inválido',
  'age.minimum': 'É necessário ter no mínimo 18 anos',
  
  // Autenticação
  'auth.invalid': 'E-mail ou senha incorretos',
  'auth.email.exists': 'Este e-mail já está cadastrado',
  'auth.unauthorized': 'Você precisa estar logado para acessar esta página',
  
  // Rede
  'network.error': 'Erro de conexão. Tente novamente.',
  'server.error': 'Erro no servidor. Tente novamente mais tarde.',
};
```

### 9.2 Mensagens de Sucesso

```typescript
const successMessages = {
  'register.success': 'Cadastro realizado com sucesso!',
  'login.success': 'Login realizado com sucesso!',
  'profile.updated': 'Perfil atualizado com sucesso!',
  'data.saved': 'Dados salvos com sucesso!',
};
```

### 9.3 Mensagens Informativas

```typescript
const infoMessages = {
  'register.pending': 'Seu cadastro está em análise. Você receberá um e-mail em até 48 horas.',
  'password.requirements': 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais',
  'cep.loading': 'Buscando endereço...',
};
```

---

## 10. Temas e Design System

### 10.1 Paleta de Cores

```typescript
const theme = {
  colors: {
    primary: {
      main: '#1890ff',
      light: '#40a9ff',
      dark: '#096dd9',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#52c41a',
      light: '#73d13d',
      dark: '#389e0d',
      contrast: '#ffffff',
    },
    error: {
      main: '#ff4d4f',
      light: '#ff7875',
      dark: '#cf1322',
    },
    warning: {
      main: '#faad14',
      light: '#ffc53d',
      dark: '#d48806',
    },
    success: {
      main: '#52c41a',
      light: '#73d13d',
      dark: '#389e0d',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e8e8e8',
      300: '#d9d9d9',
      400: '#bfbfbf',
      500: '#8c8c8c',
      600: '#595959',
      700: '#434343',
      800: '#262626',
      900: '#141414',
    },
  },
};
```

### 10.2 Tipografia

```typescript
const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
  h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.4 },
  body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
  body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.4 },
};
```

### 10.3 Espaçamentos

```typescript
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};
```

### 10.4 Breakpoints

```typescript
const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};
```

---

## 11. Animações e Transições

### 11.1 Transições Padrão

```typescript
const transitions = {
  default: 'all 0.3s ease-in-out',
  fast: 'all 0.15s ease-in-out',
  slow: 'all 0.5s ease-in-out',
};
```

### 11.2 Animações de Entrada

- Fade in: 300ms
- Slide in: 400ms
- Scale: 200ms

### 11.3 Loading States

- Skeleton screens para conteúdo em carregamento
- Spinners para ações assíncronas
- Progress bars para processos multi-step

---

## 12. Testes

### 12.1 Testes Unitários (Jest + React Testing Library)

**Prioridades**:
- [ ] Todos os componentes atoms e molecules
- [ ] Hooks customizados
- [ ] Funções de validação
- [ ] Use cases
- [ ] Serviços

**Exemplo**:
```typescript
describe('Input Component', () => {
  it('should render with label', () => {
    render(<Input label="Email" value="" onChange={() => {}} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should show error message when provided', () => {
    render(<Input label="Email" value="" error="Invalid email" onChange={() => {}} />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
```

### 12.2 Testes de Integração

**Prioridades**:
- [ ] Fluxo completo de cadastro (cada tipo)
- [ ] Fluxo de login
- [ ] Navegação entre rotas
- [ ] Validações de formulários

### 12.3 Testes E2E (Cypress ou Playwright)

**Cenários**:
- [ ] Cadastro completo de doador pessoa física
- [ ] Cadastro completo de doador instituição
- [ ] Cadastro completo de adotante
- [ ] Login e logout
- [ ] Validações de formulário

---

## 13. Acessibilidade

### 13.1 Checklist WCAG 2.1

- [ ] **Perceptível**
  - Contraste de cores adequado (4.5:1)
  - Textos alternativos em imagens
  - Legendas em vídeos (se aplicável)
  - Conteúdo adaptável a diferentes tamanhos

- [ ] **Operável**
  - Navegação completa por teclado
  - Tempo suficiente para leitura
  - Sem conteúdo piscante
  - Navegação clara e consistente

- [ ] **Compreensível**
  - Linguagem clara e simples
  - Previsibilidade de comportamento
  - Mensagens de erro claras
  - Ajuda contextual disponível

- [ ] **Robusto**
  - Compatível com tecnologias assistivas
  - HTML semântico
  - ARIA labels corretos

### 13.2 Navegação por Teclado

```
Tab: Avançar para próximo elemento focável
Shift + Tab: Voltar para elemento anterior
Enter/Space: Ativar botão/link
Esc: Fechar modal/dropdown
Arrow keys: Navegar em listas/selects
```

---

## 14. Performance

### 14.1 Otimizações

- [ ] **Code Splitting**: Divisão por rota
- [ ] **Lazy Loading**: Componentes pesados carregados sob demanda
- [ ] **Image Optimization**: Next.js Image component
- [ ] **Memoization**: React.memo, useMemo, useCallback
- [ ] **Bundle Analysis**: Análise de tamanho do bundle
- [ ] **Prefetch**: Links importantes com prefetch

### 14.2 Métricas Alvo

```
First Contentful Paint (FCP): < 1.5s
Largest Contentful Paint (LCP): < 2.5s
First Input Delay (FID): < 100ms
Cumulative Layout Shift (CLS): < 0.1
Time to Interactive (TTI): < 3.5s
```

---

## 15. SEO

### 15.1 Meta Tags

```typescript
// app/layout.tsx
export const metadata = {
  title: 'Audoção - Sistema de Adoção de Animais',
  description: 'Conectando animais a lares amorosos',
  keywords: 'adoção, animais, pets, cães, gatos',
  openGraph: {
    title: 'Audoção',
    description: 'Conectando animais a lares amorosos',
    type: 'website',
    locale: 'pt_BR',
  },
};
```

### 15.2 Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Audoção",
  "url": "https://audocao.com.br",
  "description": "Sistema de adoção de animais"
}
```

---

## 16. Segurança - Implementação Mock

### 16.1 Autenticação

```typescript
// Mock JWT
const generateMockToken = (userId: string): string => {
  return btoa(JSON.stringify({ userId, exp: Date.now() + 3600000 }));
};

// Mock de validação de token
const validateMockToken = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
};
```

### 16.2 Criptografia de Senha (Mock)

```typescript
// Simulação de hash (NÃO usar em produção)
const mockHashPassword = async (password: string): Promise<string> => {
  return btoa(password + 'MOCK_SALT');
};

const mockComparePassword = async (password: string, hash: string): Promise<boolean> => {
  return mockHashPassword(password) === hash;
};
```

### 16.3 Sanitização de Inputs

```typescript
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < e >
    .trim();
};
```

---

## 17. Documentação de Componentes

### 17.1 Storybook

Cada componente deve ter stories documentadas:

```typescript
// Button.stories.tsx
export default {
  title: 'Atoms/Button',
  component: Button,
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};

export const Loading = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
};
```

---

## 18. Convenções de Código

### 18.1 Nomenclatura

- **Componentes**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase com prefixo "use" (e.g., `useAuth.ts`)
- **Utilitários**: camelCase (e.g., `formatCpf.ts`)
- **Constantes**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Interfaces**: PascalCase com prefixo "I" (e.g., `IUserRepository`)
- **Types**: PascalCase (e.g., `UserType`)

### 18.2 Estrutura de Componente

```typescript
// Imports
import React from 'react';
import { Button } from 'antd';

// Types/Interfaces
interface ComponentProps {
  title: string;
  onClick: () => void;
}

// Component
export const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {
    onClick();
  };

  // Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
};

// Exports
export default Component;
```

### 18.3 Commits Semânticos

```
feat: Adiciona nova funcionalidade
fix: Corrige bug
docs: Atualiza documentação
style: Formatação, ponto-e-vírgula, etc
refactor: Refatoração de código
test: Adiciona ou atualiza testes
chore: Tarefas de manutenção
```

---

## 19. Checklist de Implementação

### 19.1 Setup Inicial
- [ ] Inicializar projeto Next.js com TypeScript
- [ ] Configurar ESLint + Prettier
- [ ] Instalar e configurar Ant Design
- [ ] Configurar tema customizado
- [ ] Instalar Material Icons
- [ ] Configurar estrutura de pastas (Clean Architecture)
- [ ] Configurar path aliases (@/, @/components, etc)

### 19.2 Componentes Base
- [ ] Implementar atoms (Button, Input, Icon)
- [ ] Implementar molecules (FormField, SelectionCard, Card)
- [ ] Implementar organisms (Header, Footer, MultiStepForm)
- [ ] Implementar templates (AuthLayout, MainLayout)

### 19.3 Páginas
- [ ] Tela Inicial (Landing Page)
- [ ] Login
- [ ] Escolha de Tipo de Cadastro
- [ ] Escolha de Tipo de Doador
- [ ] Cadastro Doador PF
- [ ] Cadastro Doador PJ
- [ ] Cadastro Adotante
- [ ] Tela de Confirmação

### 19.4 Lógica e Estado
- [ ] Implementar hooks (useAuth, useForm, useLocalStorage)
- [ ] Implementar validações
- [ ] Implementar mock repositories
- [ ] Implementar use cases
- [ ] Implementar serviços

### 19.5 Testes
- [ ] Testes unitários (componentes)
- [ ] Testes unitários (hooks)
- [ ] Testes unitários (validações)
- [ ] Testes de integração
- [ ] Testes E2E

### 19.6 Finalização
- [ ] Documentação (README, Storybook)
- [ ] Otimizações de performance
- [ ] Auditoria de acessibilidade
- [ ] Testes em diferentes navegadores
- [ ] Deploy (Vercel)

---

## 20. Próximos Passos (Fora do Escopo Atual)

- Integração com backend real
- Implementação de dashboard
- Listagem e busca de animais
- Sistema de mensagens entre doadores e adotantes
- Sistema de aprovação de adoção
- Notificações por e-mail
- Painel administrativo
- Relatórios e analytics
- Integração com redes sociais
- App mobile (React Native)

---

## 21. Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design](https://ant.design/)
- [Material Icons](https://fonts.google.com/icons)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Nielsen's Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Documento criado em**: 25 de novembro de 2025  
**Versão**: 1.0  
**Autor**: Equipe de Desenvolvimento Frontend