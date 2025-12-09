import type { LoginCredentials, AuthToken, User, Adopter } from '@/shared/types';
import { MockUserRepository } from './MockUserRepository';
import { LocalStorageService } from '@/infrastructure/storage/LocalStorage';
import { AuthError } from '@/shared/errors/AppError';

const AUTH_TOKEN_KEY = 'audocao_auth_token';
const CURRENT_USER_KEY = 'audocao_current_user';

export class MockAuthRepository {
  static async login(credentials: LoginCredentials): Promise<AuthToken> {
    console.log('MockAuthRepository.login chamado com:', credentials.email);
    await new Promise((resolve) => setTimeout(resolve, 500));

    let user = await MockUserRepository.findByEmail(credentials.email);
    console.log('Usuário encontrado:', user ? 'Sim' : 'Não');

    // Se o usuário não existir, cria um novo usuário adotante
    if (!user) {
      console.log('Criando novo usuário adotante');
      const newUser: Adopter = {
        id: Date.now().toString(),
        email: credentials.email,
        password: btoa(credentials.password),
        type: 'adopter',
        name: credentials.email.split('@')[0],
        cpf: '000.000.000-00',
        birthDate: '1990-01-01',
        phone: '(11) 00000-0000',
        maritalStatus: 'single',
        occupation: 'Usuário',
        address: {
          cep: '00000-000',
          street: 'Rua Exemplo',
          number: '0',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
        },
        housingInfo: {
          residenceType: 'apartment',
          ownership: 'rented',
          hasYard: false,
          isScreened: false,
          hasOtherAnimals: false,
        },
        approved: true,
        createdAt: new Date(),
      };
      user = newUser;
    } else {
      // Se o usuário existir, verifica a senha
      console.log('Verificando senha do usuário existente');
      const passwordMatch = atob(user.password) === credentials.password;
      if (!passwordMatch) {
        console.log('Senha incorreta');
        throw new AuthError('E-mail ou senha incorretos');
      }
      console.log('Senha correta');
    }

    const token: AuthToken = {
      token: btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 3600000 })),
      userId: user.id,
      userType: user.type,
    };

    console.log('Salvando token e usuário no localStorage');
    LocalStorageService.setItem(AUTH_TOKEN_KEY, token);
    LocalStorageService.setItem(CURRENT_USER_KEY, user);
    console.log('Login finalizado com sucesso');

    return token;
  }

  static async logout(): Promise<void> {
    LocalStorageService.removeItem(AUTH_TOKEN_KEY);
    LocalStorageService.removeItem(CURRENT_USER_KEY);
  }

  static getStoredToken(): AuthToken | null {
    return LocalStorageService.getItem<AuthToken>(AUTH_TOKEN_KEY);
  }

  static getCurrentUser(): User | null {
    return LocalStorageService.getItem<User>(CURRENT_USER_KEY);
  }

  static validateToken(token: string): boolean {
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  }
}
