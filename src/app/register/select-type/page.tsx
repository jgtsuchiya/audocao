'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/presentation/components/atoms/Button';
import { Logo } from '@/presentation/components/atoms/Logo';
import { HeartOutlined, HomeOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function SelectTypePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'donor' | 'adopter' | null>(null);

  const handleContinue = () => {
    if (selectedType === 'donor') {
      router.push('/register/donor-type');
    } else if (selectedType === 'adopter') {
      router.push('/register/adopter');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/" className={styles.logoLink}>
          <Logo size="medium" variant="both" />
        </Link>

        <h1 className={styles.title}>Como você deseja se cadastrar?</h1>
        <p className={styles.subtitle}>Escolha uma opção para continuar</p>

        <div className={styles.cardGrid}>
          <div
            className={`${styles.card} ${selectedType === 'adopter' ? styles.cardSelected : ''}`}
            onClick={() => setSelectedType('adopter')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedType('adopter');
              }
            }}
          >
            <div className={styles.cardIcon}>
              <HeartOutlined style={{ fontSize: 64, color: '#1890ff' }} />
            </div>
            <h2 className={styles.cardTitle}>Adotante</h2>
            <p className={styles.cardDescription}>Quero adotar um animal</p>
            <p className={styles.cardDetails}>
              Encontre seu novo companheiro e proporcione um lar amoroso
            </p>
          </div>

          <div
            className={`${styles.card} ${selectedType === 'donor' ? styles.cardSelected : ''}`}
            onClick={() => setSelectedType('donor')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedType('donor');
              }
            }}
          >
            <div className={styles.cardIcon}>
              <HomeOutlined style={{ fontSize: 64, color: '#52c41a' }} />
            </div>
            <h2 className={styles.cardTitle}>Doador</h2>
            <p className={styles.cardDescription}>Quero doar ou cadastrar animais</p>
            <p className={styles.cardDetails}>
              Ajude animais a encontrarem um lar responsável e amoroso
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/login">
            <Button variant="secondary" size="large">
              Voltar
            </Button>
          </Link>
          <Button
            variant="primary"
            size="large"
            disabled={!selectedType}
            onClick={handleContinue}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
