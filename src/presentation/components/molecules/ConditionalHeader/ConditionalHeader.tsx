'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/presentation/components/molecules/Header';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Páginas privadas que NÃO devem mostrar o header global (possuem headers próprios)
  const privatePages = ['/home', '/favorites', '/my-pets', '/my-processes', '/profile', '/requests', '/register-pet'];
  
  // Verifica se a página atual é privada
  const isPrivatePage = privatePages.some(page => pathname === page || pathname?.startsWith(page + '/'));
  
  // Não mostra o header nas páginas privadas
  if (isPrivatePage) {
    return null;
  }
  
  return <Header />;
}
