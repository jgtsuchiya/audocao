'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/presentation/components/atoms/Button';
import { BankOutlined, UserOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function DonorTypePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'person' | 'institution' | null>(null);

  const handleContinue = () => {
    if (selectedType === 'person') {
      router.push('/register/donor/person');
    } else if (selectedType === 'institution') {
      router.push('/register/donor/institution');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          🐾 Audoção
        </Link>

        <h1 className={styles.title}>Tipo de doador</h1>
        <p className={styles.subtitle}>Você é uma instituição ou pessoa física?</p>

        <div className={styles.cardGrid}>
          <div
            className={`${styles.card} ${selectedType === 'institution' ? styles.cardSelected : ''}`}
            onClick={() => setSelectedType('institution')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedType('institution');
              }
            }}
          >
            <div className={styles.cardIcon}>
              <BankOutlined style={{ fontSize: 64, color: '#52c41a' }} />
            </div>
            <h2 className={styles.cardTitle}>Instituição</h2>
            <p className={styles.cardDescription}>ONG, abrigo ou instituição</p>
            <p className={styles.cardDetails}>
              Para organizações que resgatam e cuidam de animais em busca de adoção
            </p>
          </div>

          <div
            className={`${styles.card} ${selectedType === 'person' ? styles.cardSelected : ''}`}
            onClick={() => setSelectedType('person')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedType('person');
              }
            }}
          >
            <div className={styles.cardIcon}>
              <UserOutlined style={{ fontSize: 64, color: '#1890ff' }} />
            </div>
            <h2 className={styles.cardTitle}>Pessoa Física</h2>
            <p className={styles.cardDescription}>Pessoa física/tutor individual</p>
            <p className={styles.cardDetails}>
              Para indivíduos que desejam doar ou cadastrar animais para adoção
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/register/select-type">
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
