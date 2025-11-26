import type {
  User,
  DonorPerson,
  DonorInstitution,
  Adopter,
  RegisterDonorPersonFormData,
  RegisterDonorInstitutionFormData,
  RegisterAdopterFormData,
} from '@/shared/types';
import { LocalStorageService } from '@/infrastructure/storage/LocalStorage';

const USERS_KEY = 'audocao_users';

export class MockUserRepository {
  private static getUsers(): User[] {
    return LocalStorageService.getItem<User[]>(USERS_KEY) || this.getInitialUsers();
  }

  private static getInitialUsers(): User[] {
    return [
      {
        id: '1',
        email: 'doador@email.com',
        password: btoa('Senha123!'),
        type: 'donor',
        approved: true,
        createdAt: new Date(),
      } as DonorPerson,
      {
        id: '2',
        email: 'ong@email.com',
        password: btoa('Senha123!'),
        type: 'donor',
        approved: false,
        createdAt: new Date(),
      } as DonorInstitution,
      {
        id: '3',
        email: 'adotante@email.com',
        password: btoa('Senha123!'),
        type: 'adopter',
        approved: true,
        createdAt: new Date(),
      } as Adopter,
    ];
  }

  private static saveUsers(users: User[]): void {
    LocalStorageService.setItem(USERS_KEY, users);
  }

  static async findByEmail(email: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find((user) => user.email === email) || null;
  }

  static async createDonorPerson(data: RegisterDonorPersonFormData): Promise<DonorPerson> {
    const users = this.getUsers();
    const newUser: DonorPerson = {
      id: Date.now().toString(),
      email: data.email,
      password: btoa(data.password),
      type: 'donor',
      donorType: 'person',
      name: data.name,
      cpf: data.cpf,
      birthDate: data.birthDate,
      phone: data.phone,
      address: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      approved: false,
      createdAt: new Date(),
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static async createDonorInstitution(
    data: RegisterDonorInstitutionFormData
  ): Promise<DonorInstitution> {
    const users = this.getUsers();
    const newUser: DonorInstitution = {
      id: Date.now().toString(),
      email: data.email,
      password: btoa(data.password),
      type: 'donor',
      donorType: 'institution',
      institutionName: data.institutionName,
      cnpj: data.cnpj,
      activityArea: data.activityArea,
      institutionPhone: data.institutionPhone,
      website: data.website,
      responsibleName: data.responsibleName,
      responsibleCpf: data.responsibleCpf,
      responsibleRole: data.responsibleRole,
      responsiblePhone: data.responsiblePhone,
      address: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      approved: false,
      createdAt: new Date(),
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static async createAdopter(data: RegisterAdopterFormData): Promise<Adopter> {
    const users = this.getUsers();
    const newUser: Adopter = {
      id: Date.now().toString(),
      email: data.email,
      password: btoa(data.password),
      type: 'adopter',
      name: data.name,
      cpf: data.cpf,
      birthDate: data.birthDate,
      phone: data.phone,
      maritalStatus: data.maritalStatus,
      occupation: data.occupation,
      address: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      housingInfo: {
        residenceType: data.residenceType,
        ownership: data.ownership,
        hasYard: data.hasYard,
        isScreened: data.isScreened,
        hasOtherAnimals: data.hasOtherAnimals,
        otherAnimalsDetails: data.otherAnimalsDetails,
      },
      approved: true,
      createdAt: new Date(),
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }
}
