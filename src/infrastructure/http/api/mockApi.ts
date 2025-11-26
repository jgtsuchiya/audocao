import type { Address } from '@/shared/types';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export class MockApiService {
  static async fetchAddressByCep(cep: string): Promise<Address | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockAddresses: Record<string, Address> = {
      '01310-100': {
        cep: '01310-100',
        street: 'Avenida Paulista',
        number: '',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
      },
      '20040-020': {
        cep: '20040-020',
        street: 'Rua da Assembleia',
        number: '',
        neighborhood: 'Centro',
        city: 'Rio de Janeiro',
        state: 'RJ',
      },
      '30130-010': {
        cep: '30130-010',
        street: 'Avenida Afonso Pena',
        number: '',
        neighborhood: 'Centro',
        city: 'Belo Horizonte',
        state: 'MG',
      },
    };

    const cleanCep = cep.replace(/\D/g, '');
    const formattedCep = `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`;

    if (mockAddresses[formattedCep]) {
      return mockAddresses[formattedCep];
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!response.ok) return null;

      const data: ViaCepResponse = await response.json();
      if (data.erro) return null;

      return {
        cep: data.cep,
        street: data.logradouro,
        number: '',
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      };
    } catch (error) {
      console.error('Error fetching CEP:', error);
      return null;
    }
  }

  static async sendConfirmationEmail(email: string, name: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`📧 Mock: Confirmation email sent to ${email} for ${name}`);
  }
}
