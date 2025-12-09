'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/presentation/components/atoms/Logo';
import { Button } from '@/presentation/components/atoms/Button';
import styles from './Header.module.css';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoLink} aria-label="Ir para a página inicial">
          <Logo size="medium" variant="both" />
        </Link>
        {showAuthButtons && (
          <nav className={styles.nav}>
            <Link href="/login" className={styles.loginLink}>
              Entrar
            </Link>
            <Link href="/register/select-type">
              <Button variant="primary">Cadastrar-se</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
