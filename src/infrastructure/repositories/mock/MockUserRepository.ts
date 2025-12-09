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
        donorType: 'person',
        name: 'João Silva',
        cpf: '123.456.789-00',
        birthDate: '1985-05-15',
        phone: '(11) 98765-4321',
        address: {
          cep: '01310-100',
          street: 'Avenida Paulista',
          number: '1000',
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
        },
        approved: true,
        createdAt: new Date(),
      } as DonorPerson,
      {
        id: '2',
        email: 'ong@email.com',
        password: btoa('Senha123!'),
        type: 'donor',
        donorType: 'institution',
        institutionName: 'ONG Patinhas Felizes',
        cnpj: '12.345.678/0001-90',
        activityArea: 'Proteção Animal',
        institutionPhone: '(11) 3456-7890',
        website: 'https://patinhasfelizes.org.br',
        responsibleName: 'Maria Santos',
        responsibleCpf: '987.654.321-00',
        responsibleRole: 'Diretora',
        responsiblePhone: '(11) 99876-5432',
        address: {
          cep: '04567-890',
          street: 'Rua das Flores',
          number: '234',
          neighborhood: 'Vila Mariana',
          city: 'São Paulo',
          state: 'SP',
        },
        approved: true,
        createdAt: new Date(),
      } as DonorInstitution,
      {
        id: '3',
        email: 'adotante@email.com',
        password: btoa('Senha123!'),
        type: 'adopter',
        name: 'Ana Costa',
        cpf: '456.789.123-00',
        birthDate: '1990-08-20',
        phone: '(11) 91234-5678',
        maritalStatus: 'single',
        occupation: 'Desenvolvedora',
        address: {
          cep: '05678-901',
          street: 'Rua dos Jardins',
          number: '567',
          neighborhood: 'Pinheiros',
          city: 'São Paulo',
          state: 'SP',
        },
        housingInfo: {
          residenceType: 'apartment',
          ownership: 'rented',
          hasYard: false,
          isScreened: true,
          hasOtherAnimals: false,
        },
        approved: true,
        createdAt: new Date(),
      } as Adopter,
      {
        id: '4',
        email: 'caue-dasilva88@care-br.com',
        password: btoa('1Ol@123456'),
        type: 'adopter',
        name: 'Cauê da Silva',
        cpf: '789.123.456-00',
        birthDate: '1988-03-10',
        phone: '(11) 98888-7777',
        maritalStatus: 'single',
        occupation: 'Analista de TI',
        address: {
          cep: '01234-567',
          street: 'Rua Example',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
        },
        housingInfo: {
          residenceType: 'house',
          ownership: 'owned',
          hasYard: true,
          isScreened: true,
          hasOtherAnimals: false,
        },
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
