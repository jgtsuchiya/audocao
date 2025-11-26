import type { LoginCredentials, AuthToken, User } from '@/shared/types';
import { MockUserRepository } from './MockUserRepository';
import { LocalStorageService } from '@/infrastructure/storage/LocalStorage';
import { AuthError } from '@/shared/errors/AppError';

const AUTH_TOKEN_KEY = 'audocao_auth_token';
const CURRENT_USER_KEY = 'audocao_current_user';

export class MockAuthRepository {
  static async login(credentials: LoginCredentials): Promise<AuthToken> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = await MockUserRepository.findByEmail(credentials.email);

    if (!user) {
      throw new AuthError('E-mail ou senha incorretos');
    }

    const passwordMatch = atob(user.password) === credentials.password;

    if (!passwordMatch) {
      throw new AuthError('E-mail ou senha incorretos');
    }

    const token: AuthToken = {
      token: btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 3600000 })),
      userId: user.id,
      userType: user.type,
    };

    LocalStorageService.setItem(AUTH_TOKEN_KEY, token);
    LocalStorageService.setItem(CURRENT_USER_KEY, user);

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
