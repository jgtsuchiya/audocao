import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { theme } from '@/presentation/styles/theme';
import { ConditionalHeader } from '@/presentation/components/molecules/ConditionalHeader';
import '@/presentation/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Audoção - Sistema de Adoção de Animais',
  description: 'Conectando animais a lares amorosos',
  keywords: 'adoção, animais, pets, cães, gatos',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          <ConditionalHeader />
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
