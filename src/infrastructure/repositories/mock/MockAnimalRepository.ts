import type { Animal, AnimalFilters, AdoptionRequest, AdoptionRequestFormData } from '@/shared/types';
import { LocalStorageService } from '@/infrastructure/storage/LocalStorage';

const ANIMALS_KEY = 'audocao_animals';
const ADOPTION_REQUESTS_KEY = 'audocao_adoption_requests';

export class MockAnimalRepository {
  private static getAnimals(): Animal[] {
    const stored = LocalStorageService.getItem<Animal[]>(ANIMALS_KEY);
    if (stored && stored.length > 0) {
      return stored;
    }
    const initial = this.getInitialAnimals();
    this.saveAnimals(initial);
    return initial;
  }

  private static getInitialAnimals(): Animal[] {
    return [
      {
        id: '1',
        name: 'Thor',
        type: 'dog',
        breed: 'Labrador',
        age: 'adult',
        ageInYears: 3,
        size: 'large',
        gender: 'male',
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop',
        description: 'Thor é um Labrador super amigável e carinhoso. Adora brincar e é ótimo com crianças.',
        healthInfo: 'Vacinado em dia, vermifugado e castrado. Saúde perfeita!',
        adoptionProcess: 'Entre em contato conosco para agendar uma visita. Realizamos entrevista e visita ao lar.',
        personality: ['Amigável', 'Brincalhão', 'Protetor', 'Energético'],
        vaccinated: true,
        neutered: true,
        donorId: '1',
        createdAt: new Date('2024-11-01'),
      },
      {
        id: '2',
        name: 'Luna',
        type: 'cat',
        breed: 'Siamês',
        age: 'puppy',
        ageInYears: 1,
        size: 'small',
        gender: 'female',
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop',
        description: 'Luna é uma gatinha siamesa muito carinhosa e esperta. Adora fazer companhia.',
        healthInfo: 'Vacinada, vermifugada e castrada. Sem problemas de saúde.',
        adoptionProcess: 'Preencha o formulário de interesse e entraremos em contato em até 48 horas.',
        personality: ['Carinhosa', 'Inteligente', 'Independente', 'Calma'],
        vaccinated: true,
        neutered: true,
        donorId: '2',
        createdAt: new Date('2024-11-15'),
      },
      {
        id: '3',
        name: 'Bob',
        type: 'dog',
        breed: 'Vira-lata',
        age: 'senior',
        ageInYears: 8,
        size: 'medium',
        gender: 'male',
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=400&fit=crop',
        description: 'Bob é um cachorro muito tranquilo e amoroso. Perfeito para quem busca um companheiro calmo.',
        healthInfo: 'Vacinado, vermifugado e castrado. Tem artrose leve, mas controlada com medicação.',
        adoptionProcess: 'Visite nosso abrigo para conhecê-lo pessoalmente. Aberto de terça a domingo.',
        personality: ['Tranquilo', 'Leal', 'Carinhoso', 'Obediente'],
        vaccinated: true,
        neutered: true,
        specialNeeds: 'Necessita medicação diária para artrose',
        donorId: '2',
        createdAt: new Date('2024-10-20'),
      },
      {
        id: '4',
        name: 'Nina',
        type: 'cat',
        breed: 'Persa',
        age: 'adult',
        ageInYears: 4,
        size: 'medium',
        gender: 'female',
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
        description: 'Nina é uma gata persa elegante e carinhosa. Adora colo e carinho.',
        healthInfo: 'Vacinada e castrada. Requer escovação regular devido ao pelo longo.',
        adoptionProcess: 'Agende uma visita através do nosso formulário online.',
        personality: ['Elegante', 'Carinhosa', 'Calma', 'Sociável'],
        vaccinated: true,
        neutered: true,
        donorId: '1',
        createdAt: new Date('2024-11-10'),
      },
      {
        id: '5',
        name: 'Max',
        type: 'dog',
        breed: 'Beagle',
        age: 'puppy',
        ageInYears: 0.5,
        size: 'small',
        gender: 'male',
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop',
        description: 'Max é um filhote de Beagle cheio de energia e muito curioso. Perfeito para famílias ativas.',
        healthInfo: 'Primeiras vacinas em dia. Ainda precisa completar o protocolo de vacinação.',
        adoptionProcess: 'Requer compromisso de completar vacinação e castração futura.',
        personality: ['Curioso', 'Energético', 'Amigável', 'Inteligente'],
        vaccinated: false,
        neutered: false,
        donorId: '2',
        createdAt: new Date('2024-11-20'),
      },
      {
        id: '6',
        name: 'Mia',
        type: 'cat',
        breed: 'Vira-lata',
        age: 'adult',
        ageInYears: 2,
        size: 'small',
        gender: 'female',
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
        description: 'Mia é uma gatinha tricolor muito independente e carinhosa. Ótima caçadora de brinquedos!',
        healthInfo: 'Totalmente saudável, vacinada e castrada.',
        adoptionProcess: 'Entre em contato para conhecê-la. Adoção responsável com termo de compromisso.',
        personality: ['Independente', 'Ativa', 'Carinhosa', 'Brincalhona'],
        vaccinated: true,
        neutered: true,
        donorId: '1',
        createdAt: new Date('2024-11-05'),
      },
      {
        id: '7',
        name: 'Rex',
        type: 'dog',
        breed: 'Pastor Alemão',
        age: 'adult',
        ageInYears: 5,
        size: 'large',
        gender: 'male',
        status: 'in_process',
        photo: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop',
        description: 'Rex é um pastor alemão muito inteligente e leal. Precisa de espaço e exercícios regulares.',
        healthInfo: 'Excelente saúde. Vacinado, vermifugado e castrado.',
        adoptionProcess: 'Em processo de adoção. Consulte outras opções disponíveis.',
        personality: ['Inteligente', 'Leal', 'Protetor', 'Disciplinado'],
        vaccinated: true,
        neutered: true,
        donorId: '2',
        createdAt: new Date('2024-10-15'),
      },
      {
        id: '8',
        name: 'Mel',
        type: 'dog',
        breed: 'Golden Retriever',
        age: 'puppy',
        ageInYears: 0.8,
        size: 'medium',
        gender: 'female',
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop',
        description: 'Mel é uma filhote de Golden muito dócil e brincalhona. Adora crianças e outros animais.',
        healthInfo: 'Vacinação em andamento, castração agendada.',
        adoptionProcess: 'Adoção com acompanhamento. Requer compromisso de treino e socialização.',
        personality: ['Dócil', 'Brincalhona', 'Sociável', 'Inteligente'],
        vaccinated: false,
        neutered: false,
        donorId: '1',
        createdAt: new Date('2024-11-18'),
      },
    ];
  }

  private static saveAnimals(animals: Animal[]): void {
    LocalStorageService.setItem(ANIMALS_KEY, animals);
  }

  private static getAdoptionRequests(): AdoptionRequest[] {
    return LocalStorageService.getItem<AdoptionRequest[]>(ADOPTION_REQUESTS_KEY) || [];
  }

  private static saveAdoptionRequests(requests: AdoptionRequest[]): void {
    LocalStorageService.setItem(ADOPTION_REQUESTS_KEY, requests);
  }

  static async findAll(filters?: AnimalFilters): Promise<Animal[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    let animals = this.getAnimals();

    if (filters) {
      if (filters.type) {
        animals = animals.filter((animal) => animal.type === filters.type);
      }
      if (filters.age) {
        animals = animals.filter((animal) => animal.age === filters.age);
      }
      if (filters.size) {
        animals = animals.filter((animal) => animal.size === filters.size);
      }
      if (filters.gender) {
        animals = animals.filter((animal) => animal.gender === filters.gender);
      }
    }

    // Only return available animals or those in process (for display purposes)
    return animals.filter((animal) => animal.status !== 'adopted');
  }

  static async findById(id: string): Promise<Animal | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const animals = this.getAnimals();
    return animals.find((animal) => animal.id === id) || null;
  }

  static async createAdoptionRequest(
    animalId: string,
    data: AdoptionRequestFormData
  ): Promise<AdoptionRequest> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const requests = this.getAdoptionRequests();
    const newRequest: AdoptionRequest = {
      id: Date.now().toString(),
      animalId,
      adopterName: data.name,
      adopterEmail: data.email,
      adopterPhone: data.phone,
      adopterAddress: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      adoptionReason: data.adoptionReason,
      monthlyIncome: data.monthlyIncome,
      hasChildren: data.hasChildren,
      childrenAges: data.childrenAges,
      hasExperience: data.hasExperience,
      experienceDetails: data.experienceDetails,
      allResidentsAgree: data.allResidentsAgree,
      status: 'pending',
      createdAt: new Date(),
    };

    requests.push(newRequest);
    this.saveAdoptionRequests(requests);

    return newRequest;
  }
}
