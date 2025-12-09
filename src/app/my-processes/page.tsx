'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAuth } from '@/presentation/hooks/useAuth';
import { Button } from '@/presentation/components/atoms/Button';
import { Card } from '@/presentation/components/atoms/Card';
import { Logo } from '@/presentation/components/atoms/Logo';
import styles from './page.module.css';

interface AdoptionProcess {
  id: string;
  animalName: string;
  animalImage: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
  lastUpdate: Date;
  donorName: string;
}

export default function MyProcessesPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [processes, setProcesses] = useState<AdoptionProcess[]>([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (user && user.type === 'adopter') {
      // Mock data - em produção viria de uma API
      setProcesses([
        {
          id: '1',
          animalName: 'Rex',
          animalImage: '/placeholder-dog.jpg',
          status: 'pending',
          requestDate: new Date('2024-12-01'),
          lastUpdate: new Date('2024-12-05'),
          donorName: 'João Silva',
        },
      ]);
    }
  }, [user]);

  const getStatusBadge = (status: AdoptionProcess['status']) => {
    const badges = {
      pending: { icon: <ClockCircleOutlined />, text: 'Em análise', className: styles.statusPending },
      approved: { icon: <CheckCircleOutlined />, text: 'Aprovado', className: styles.statusApproved },
      rejected: { icon: <CloseCircleOutlined />, text: 'Rejeitado', className: styles.statusRejected },
    };

    const badge = badges[status];
    return (
      <span className={`${styles.statusBadge} ${badge.className}`}>
        {badge.icon} {badge.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Logo size="small" variant="both" />
          <Button variant="secondary" onClick={() => router.push('/home')}>
            Voltar
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <Button variant="tertiary" onClick={() => router.back()} style={{ border: '2px solid white', color: 'white' }}>
            <ArrowLeftOutlined /> Voltar
          </Button>
          <h1>Meus Processos de Adoção</h1>
        </div>

        {processes.length === 0 ? (
          <Card className={styles.emptyState}>
            <h3>Nenhum processo em andamento</h3>
            <p>Você ainda não iniciou nenhum processo de adoção.</p>
            <Button variant="primary" onClick={() => router.push('/adoption')}>
              Buscar Pets para Adotar
            </Button>
          </Card>
        ) : (
          <div className={styles.processesList}>
            {processes.map((process) => (
              <Card key={process.id} className={styles.processCard}>
                <div className={styles.processImage}>
                  <Image 
                    src={process.animalImage} 
                    alt={process.animalName}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.processInfo}>
                  <h3>{process.animalName}</h3>
                  <p className={styles.donorName}>Doador: {process.donorName}</p>
                  <div className={styles.dates}>
                    <span>Solicitado em: {process.requestDate.toLocaleDateString('pt-BR')}</span>
                    <span>Última atualização: {process.lastUpdate.toLocaleDateString('pt-BR')}</span>
                  </div>
                  {getStatusBadge(process.status)}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
