'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useAuth } from '@/presentation/hooks/useAuth';
import { MockAnimalRepository } from '@/infrastructure/repositories/mock/MockAnimalRepository';
import { Button } from '@/presentation/components/atoms/Button';
import { Card } from '@/presentation/components/atoms/Card';
import { Logo } from '@/presentation/components/atoms/Logo';
import type { Animal } from '@/shared/types';
import { message, Modal } from 'antd';
import styles from './page.module.css';

export default function MyPetsPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState<Animal[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.type !== 'donor')) {
      router.push('/home');
    }
  }, [isAuthenticated, user, loading, router]);

  useEffect(() => {
    const loadPets = async () => {
      if (!user) return;
      
      try {
        const animals = await MockAnimalRepository.findAllIncludingAdopted();
        const userPets = animals.filter((a: Animal) => a.donorId === user.id);
        setPets(userPets);
      } catch (error) {
        message.error('Erro ao carregar pets');
      } finally {
        setLoadingPets(false);
      }
    };

    if (user && user.type === 'donor') {
      loadPets();
    }
  }, [user]);

  const handleDelete = (petId: string, petName: string) => {
    Modal.confirm({
      title: 'Remover Pet',
      content: `Tem certeza que deseja remover ${petName} do sistema?`,
      okText: 'Sim, remover',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          // Em produção, chamaria uma API para deletar
          setPets(pets.filter(p => p.id !== petId));
          message.success('Pet removido com sucesso');
        } catch (error) {
          message.error('Erro ao remover pet');
        }
      },
    });
  };

  const getStatusBadge = (status: Animal['status']) => {
    const badges = {
      available: { text: 'Disponível', className: styles.statusAvailable },
      in_process: { text: 'Em processo', className: styles.statusInProcess },
      adopted: { text: 'Adotado', className: styles.statusAdopted },
    };

    const badge = badges[status];
    return <span className={`${styles.statusBadge} ${badge.className}`}>{badge.text}</span>;
  };

  if (loading || loadingPets) {
    return (
      <div className={styles.loading}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user || user.type !== 'donor') {
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
          <div>
            <Button variant="tertiary" onClick={() => router.back()} style={{ border: '2px solid white', color: 'white' }}>
              <ArrowLeftOutlined /> Voltar
            </Button>
            <h1>Meus Pets</h1>
            <p>Gerencie os animais cadastrados para adoção</p>
          </div>
          <Button variant="primary" onClick={() => router.push('/register-pet')}>
            Cadastrar Novo Pet
          </Button>
        </div>

        {pets.length === 0 ? (
          <Card className={styles.emptyState}>
            <h3>Nenhum pet cadastrado</h3>
            <p>Você ainda não cadastrou nenhum animal para adoção.</p>
            <Button variant="primary" onClick={() => router.push('/register-pet')}>
              Cadastrar Primeiro Pet
            </Button>
          </Card>
        ) : (
          <div className={styles.petsGrid}>
            {pets.map((pet) => (
              <Card key={pet.id} className={styles.petCard}>
                <div className={styles.petImage}>
                  <Image 
                    src={pet.photo || '/placeholder-pet.jpg'} 
                    alt={pet.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {getStatusBadge(pet.status)}
                </div>
                <div className={styles.petInfo}>
                  <h3>{pet.name}</h3>
                  <p className={styles.petDetails}>
                    {pet.type === 'dog' ? 'Cachorro' : 'Gato'} • {pet.breed} • {pet.ageInYears} {pet.ageInYears === 1 ? 'ano' : 'anos'}
                  </p>
                  <p className={styles.petDescription}>
                    {pet.description?.substring(0, 100)}
                    {pet.description && pet.description.length > 100 ? '...' : ''}
                  </p>
                  
                  <div className={styles.petActions}>
                    <Button 
                      variant="secondary" 
                      onClick={() => router.push(`/adoption/${pet.id}`)}
                    >
                      <EyeOutlined /> Ver
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => router.push(`/my-pets/${pet.id}/edit`)}
                      disabled={pet.status === 'adopted'}
                    >
                      <EditOutlined /> Editar
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => handleDelete(pet.id, pet.name)}
                      disabled={pet.status === 'adopted'}
                    >
                      <DeleteOutlined /> Remover
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
