# 🐾 Audoção - Sistema de Adoção de Animais

Sistema web para gerenciamento de adoção de animais, conectando doadores (instituições e pessoas físicas) com potenciais adotantes.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Credenciais de Teste](#credenciais-de-teste)
- [Desenvolvimento](#desenvolvimento)
- [Build e Deploy](#build-e-deploy)

## 🎯 Sobre o Projeto

O **Audoção** é uma plataforma frontend desenvolvida para facilitar o processo de adoção de animais, conectando:

- **Doadores**: Instituições (ONGs, abrigos) e pessoas físicas que desejam cadastrar animais para adoção
- **Adotantes**: Pessoas que buscam adotar um animal de estimação

### Principais Características

- ✅ Interface moderna e responsiva
- ✅ Formulários multi-step com validações em tempo real
- ✅ Arquitetura limpa e escalável (Clean Architecture)
- ✅ Seguindo princípios SOLID e Clean Code
- ✅ Acessibilidade (WCAG 2.1)
- ✅ Heurísticas de Nielsen aplicadas
- ✅ Mock de dados (frontend-only)

## 🚀 Tecnologias

### Core

- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem tipada
- **[React 18](https://react.dev/)** - Biblioteca UI

### UI & Styling

- **[Ant Design 5](https://ant.design/)** - Biblioteca de componentes
- **[Ant Design Icons](https://ant.design/components/icon/)** - Ícones
- **CSS Modules** - Estilização com escopo local

### Ferramentas de Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código

### Versões Recomendadas

```json
{
  "node": ">=18.17.0",
  "npm": ">=9.0.0"
}
```

## 🏛️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas:

```
src/
├── app/                      # Next.js App Router (Rotas)
├── domain/                   # Entidades e Regras de Negócio
├── application/              # Casos de Uso e Interfaces
├── infrastructure/           # Implementações (Repositories, APIs)
├── presentation/             # Componentes UI e Hooks
└── shared/                   # Utilitários Compartilhados
```

### Princípios SOLID Aplicados

- **S**ingle Responsibility: Cada componente/função tem uma única responsabilidade
- **O**pen/Closed: Extensível via props e interfaces
- **L**iskov Substitution: Implementações mock substituem interfaces
- **I**nterface Segregation: Interfaces específicas por domínio
- **D**ependency Inversion: Dependência de abstrações, não implementações

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.17 ou superior)
- **npm** (versão 9.0 ou superior) ou **yarn**
- **Git**

### Verificar Versões

```bash
node --version   # Deve ser >= v18.17.0
npm --version    # Deve ser >= 9.0.0
```

### Instalar Node.js

#### Linux (Ubuntu/Debian)

```bash
# Usando nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### macOS

```bash
# Usando Homebrew
brew install node@18
```

#### Windows

Baixe o instalador em: https://nodejs.org/

## 🔧 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/jgtsuchiya/audocao.git
cd audocao
```

### 2. Instalar Dependências

```bash
npm install
```

ou se preferir usar yarn:

```bash
yarn install
```

### 3. Executar o Projeto

```bash
npm run dev
```

O aplicativo estará disponível em: **http://localhost:3000**

## 🎮 Comandos Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Servidor estará rodando em http://localhost:3000
```

### Build

```bash
# Gerar build de produção
npm run build

# Iniciar servidor de produção
npm start
```

### Qualidade de Código

```bash
# Executar linter (ESLint)
npm run lint

# Formatar código (Prettier)
npm run format
```

### Outros Comandos Úteis

```bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## 📁 Estrutura do Projeto

```
audocao/
├── .next/                                  # Build gerado pelo Next.js (ignorado)
├── node_modules/                           # Dependências (ignorado)
├── public/                                 # Arquivos estáticos
├── src/
│   ├── app/                                # Rotas e páginas (Next.js App Router)
│   │   ├── login/                          # Página de login
│   │   ├── register/                       # Páginas de cadastro
│   │   │   ├── select-type/                # Escolha: Doador ou Adotante
│   │   │   ├── donor-type/                 # Escolha: Instituição ou PF
│   │   │   ├── donor/                      # Cadastro de doadores
│   │   │   │   ├── person/                 # Cadastro PF
│   │   │   │   └── institution/            # Cadastro PJ
│   │   │   ├── adopter/                    # Cadastro de adotante
│   │   │   └── success/                    # Confirmação de cadastro
│   │   ├── layout.tsx                      # Layout raiz
│   │   └── page.tsx                        # Página inicial
│   ├── domain/                             # Camada de Domínio
│   │   ├── entities/                       # Entidades de negócio
│   │   └── usecases/                       # Casos de uso
│   ├── application/                        # Camada de Aplicação
│   │   ├── interfaces/                     # Contratos/Interfaces
│   │   └── services/                       # Serviços de aplicação
│   ├── infrastructure/                     # Camada de Infraestrutura
│   │   ├── repositories/                   # Implementações de repositórios
│   │   │   └── mock/                       # Mock repositories
│   │   ├── http/                           # Clientes HTTP
│   │   │   └── api/                        # APIs mock
│   │   └── storage/                        # LocalStorage service
│   ├── presentation/                       # Camada de Apresentação
│   │   ├── components/                     # Componentes React
│   │   │   ├── atoms/                      # Componentes básicos
│   │   │   │   ├── Button/
│   │   │   │   └── Input/
│   │   │   ├── molecules/                  # Composições de atoms
│   │   │   ├── organisms/                  # Componentes complexos
│   │   │   └── templates/                  # Templates de layout
│   │   ├── hooks/                          # Custom React Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useForm.ts
│   │   │   └── useLocalStorage.ts
│   │   └── styles/                         # Estilos globais e tema
│   └── shared/                             # Código compartilhado
│       ├── types/                          # Tipos TypeScript
│       ├── utils/                          # Utilitários
│       │   ├── validators.ts               # Funções de validação
│       │   ├── formatters.ts               # Formatadores
│       │   └── constants.ts                # Constantes
│       └── errors/                         # Classes de erro customizadas
├── .eslintrc.json                          # Configuração ESLint
├── .prettierrc                             # Configuração Prettier
├── next.config.js                          # Configuração Next.js
├── tsconfig.json                           # Configuração TypeScript
├── package.json                            # Dependências e scripts
└── README.md                               # Este arquivo
```

## ✨ Funcionalidades

### ✅ Implementadas

#### 1. Tela Inicial (Landing Page)
- Hero section com call-to-action
- Cards de funcionalidades
- Navegação responsiva
- Footer informativo

#### 2. Autenticação
- **Login**: Formulário com validação
- **Registro**: Fluxo multi-step para doadores e adotantes

#### 3. Cadastro de Doador - Pessoa Física
- Dados pessoais (nome, CPF, data de nascimento, telefone)
- Endereço completo com busca por CEP
- Dados de acesso (e-mail e senha)

#### 4. Cadastro de Doador - Instituição
- Dados da instituição (nome, CNPJ, área de atuação)
- Dados do responsável
- Endereço completo
- Dados de acesso

#### 5. Cadastro de Adotante
- Dados pessoais completos
- Informações sobre moradia
- Informações sobre outros animais
- Dados de acesso

#### 6. Validações
- CPF e CNPJ com validação de dígitos
- E-mail com formato válido
- Senha forte (8+ caracteres, maiúsculas, minúsculas, números, especiais)
- Telefone brasileiro
- CEP com integração ViaCEP
- Idade mínima de 18 anos

### 🔄 Mock Data

O sistema utiliza dados mockados armazenados no **localStorage** do navegador:

- Autenticação simulada
- Repositório de usuários em memória
- Tokens JWT simulados
- API de CEP com fallback para ViaCEP real

## 🔐 Credenciais de Teste

Use as seguintes credenciais para testar o sistema:

### Doador (Aprovado)
```
E-mail: doador@email.com
Senha: Senha123!
```

### Doador Instituição (Pendente)
```
E-mail: ong@email.com
Senha: Senha123!
```

### Adotante (Aprovado)
```
E-mail: adotante@email.com
Senha: Senha123!
```

## 💻 Desenvolvimento

### Padrões de Código

#### Nomenclatura

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase com prefixo "use" (`useAuth.ts`)
- **Utilitários**: camelCase (`formatCpf.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Interfaces**: PascalCase com prefixo "I" (`IUserRepository`)

#### Commits Semânticos

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração sem mudança de funcionalidade
test: adiciona ou atualiza testes
chore: tarefas de manutenção
```

### Adicionando Novos Componentes

```bash
# Estrutura recomendada para componente
src/presentation/components/atoms/NovoComponente/
├── NovoComponente.tsx        # Componente
├── NovoComponente.module.css # Estilos
└── index.ts                  # Export
```

### Path Aliases

O projeto usa path aliases para imports limpos:

```typescript
import { Button } from '@/presentation/components/atoms/Button';
import { User } from '@/shared/types';
import { validateCPF } from '@/shared/utils/validators';
```

## 🚀 Build e Deploy

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Testar build localmente
npm start
```

### Deploy na Vercel (Recomendado)

1. Criar conta na [Vercel](https://vercel.com/)
2. Conectar repositório GitHub
3. Deploy automático em cada push

```bash
# Ou via CLI
npm i -g vercel
vercel
```

### Deploy em Outros Serviços

O projeto Next.js pode ser deployado em:

- **Netlify**: Suporte nativo para Next.js
- **AWS Amplify**: Com configuração Next.js
- **Railway**: Deploy simples via GitHub
- **DigitalOcean App Platform**: Suporte Next.js

### Variáveis de Ambiente

Crie um arquivo `.env.local` se necessário:

```env
# Exemplo (não usado no mock atual)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📱 Responsividade

Breakpoints utilizados:

```css
/* Mobile */
@media (max-width: 576px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (min-width: 992px) { }
```

## ♿ Acessibilidade

O projeto implementa:

- ✅ Navegação por teclado completa
- ✅ ARIA labels em elementos interativos
- ✅ Contraste de cores adequado (4.5:1)
- ✅ Focus visible em elementos focáveis
- ✅ Textos alternativos em imagens
- ✅ Labels associados a inputs

## 🎨 Tema e Design System

### Paleta de Cores

```css
Primary: #1890ff
Success: #52c41a
Warning: #faad14
Error: #ff4d4f
```

### Tipografia

```css
Font Family: 'Inter', sans-serif
Font Sizes: 12px, 14px, 16px, 20px, 24px, 28px, 32px, 48px
```

## 📚 Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design](https://ant.design/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é um protótipo educacional.

## 👨‍💻 Autor

Desenvolvido como parte do projeto Audoção

---

**Feito com 💙 para ajudar animais a encontrarem um lar**
