'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/hooks/useAuth';
import { MockAnimalRepository } from '@/infrastructure/repositories/mock/MockAnimalRepository';
import { Button } from '@/presentation/components/atoms/Button';
import { Card } from '@/presentation/components/atoms/Card';
import { Logo } from '@/presentation/components/atoms/Logo';
import type { Animal, Adopter, DonorPerson, DonorInstitution } from '@/shared/types';
import styles from './page.module.css';

interface ActivityStats {
  adoptionsThisMonth?: number;
  activeProcesses?: number;
  favorites?: number;
  lastAdoptionDate?: Date;
  availablePets?: number;
  adoptedPets?: number;
  pendingRequests?: number;
}

export default function HomePage() {
  const { isAuthenticated, user, loading, logout } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [stats, setStats] = useState<ActivityStats>({});
  const [featuredAnimals, setFeaturedAnimals] = useState<Animal[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const getUserName = useCallback((): string => {
    if (!user) return '';
    
    if (user.type === 'adopter') {
      return (user as Adopter).name;
    } else if (user.type === 'donor') {
      const donor = user as DonorPerson | DonorInstitution;
      if ('name' in donor) {
        return donor.name;
      } else {
        return donor.institutionName;
      }
    }
    
    return '';
  }, [user]);

  const updateGreeting = useCallback(() => {
    const hour = new Date().getHours();
    let period = '';
    
    if (hour >= 0 && hour < 12) {
      period = 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
      period = 'Boa tarde';
    } else {
      period = 'Boa noite';
    }

    const userName = getUserName();
    setGreeting(`${period}, ${userName}!`);
  }, [getUserName]);

  const loadStats = useCallback(async () => {
    if (!user) return;

    // Mock statistics based on user type
    if (user.type === 'adopter') {
      setStats({
        adoptionsThisMonth: 0,
        activeProcesses: 0,
        favorites: 0,
      });
    } else if (user.type === 'donor') {
      const animals = await MockAnimalRepository.findAllIncludingAdopted();
      const userAnimals = animals.filter((a: Animal) => a.donorId === user.id);
      
      setStats({
        availablePets: userAnimals.filter((a: Animal) => a.status === 'available').length,
        adoptedPets: userAnimals.filter((a: Animal) => a.status === 'adopted').length,
        pendingRequests: userAnimals.filter((a: Animal) => a.status === 'in_process').length,
      });
    }
  }, [user]);

  const loadFeaturedAnimals = useCallback(async () => {
    if (!user) return;

    if (user.type === 'adopter') {
      // For adopters, show available animals
      const animals = await MockAnimalRepository.findAll();
      const available = animals.filter((a: Animal) => a.status === 'available').slice(0, 6);
      setFeaturedAnimals(available);
    } else if (user.type === 'donor') {
      // For donors, show their own animals (including adopted)
      const animals = await MockAnimalRepository.findAllIncludingAdopted();
      const userAnimals = animals.filter((a: Animal) => a.donorId === user.id).slice(0, 6);
      setFeaturedAnimals(userAnimals);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      updateGreeting();
      loadStats();
      loadFeaturedAnimals();
    }
  }, [user, updateGreeting, loadStats, loadFeaturedAnimals]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
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
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Logo size="small" variant="both" />
          <div className={styles.headerActions}>
            <Button 
              variant="secondary" 
              onClick={() => setShowLogoutConfirm(true)}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Greeting */}
        <section className={styles.greeting}>
          <h1>{greeting}</h1>
        </section>

        {/* Activity Summary */}
        <section className={styles.statsSection}>
          <h2>Resumo de Atividades</h2>
          <div className={styles.statsGrid}>
            {user.type === 'adopter' ? (
              <>
                <Card className={styles.statCard}>
                  <div className={styles.statNumber}>{stats.adoptionsThisMonth || 0}</div>
                  <div className={styles.statLabel}>Adoções este mês</div>
                </Card>
                <Card className={styles.statCard}>
                  <div className={styles.statNumber}>{stats.activeProcesses || 0}</div>
                  <div className={styles.statLabel}>Processos em andamento</div>
                </Card>
                <Card className={styles.statCard}>
                  <div className={styles.statNumber}>{stats.favorites || 0}</div>
                  <div className={styles.statLabel}>Pets favoritados</div>
                </Card>
              </>
            ) : (
              <>
                <Card className={styles.statCard}>
                  <div className={styles.statNumber}>{stats.availablePets || 0}</div>
                  <div className={styles.statLabel}>Pets disponíveis</div>
                </Card>
                <Card className={styles.statCard}>
                  <div className={styles.statNumber}>{stats.adoptedPets || 0}</div>
                  <div className={styles.statLabel}>Pets adotados</div>
                </Card>
                <Card className={styles.statCard}>
                  <div className={styles.statNumber}>{stats.pendingRequests || 0}</div>
                  <div className={styles.statLabel}>Solicitações pendentes</div>
                </Card>
              </>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className={styles.actionsSection}>
          <h2>Ações Rápidas</h2>
          <div className={styles.actionsGrid}>
            {user.type === 'adopter' ? (
              <>
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={() => router.push('/adoption')}
                >
                  Adotar Novo Pet
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => router.push('/my-processes')}
                >
                  Meus Processos
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => router.push('/favorites')}
                >
                  Meus Favoritos
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => router.push('/profile')}
                >
                  Meu Perfil
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={() => router.push('/register-pet')}
                >
                  Cadastrar Novo Pet
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => router.push('/my-pets')}
                >
                  Meus Pets
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => router.push('/requests')}
                >
                  Solicitações Recebidas
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => router.push('/profile')}
                >
                  Meu Perfil
                </Button>
              </>
            )}
          </div>
        </section>

        {/* Featured Section */}
        <section className={styles.featuredSection}>
          <div className={styles.featuredHeader}>
            <h2>
              {user.type === 'adopter' ? 'Animais em Destaque' : 'Meus Pets'}
            </h2>
            {featuredAnimals.length > 0 && (
              <Button 
                variant="secondary" 
                onClick={() => router.push(user.type === 'adopter' ? '/adoption' : '/my-pets')}
              >
                Ver {user.type === 'adopter' ? 'Mais' : 'Todos'}
              </Button>
            )}
          </div>

          {featuredAnimals.length === 0 ? (
            <Card className={styles.emptyState}>
              <p>
                {user.type === 'adopter' 
                  ? 'Nenhum animal disponível no momento.' 
                  : 'Você ainda não cadastrou nenhum pet.'}
              </p>
              {user.type === 'donor' && (
                <Button 
                  variant="primary" 
                  onClick={() => router.push('/register-pet')}
                >
                  Cadastrar Primeiro Pet
                </Button>
              )}
            </Card>
          ) : (
            <div className={styles.animalsGrid}>
              {featuredAnimals.map((animal) => (
                <Card 
                  key={animal.id} 
                  className={styles.animalCard}
                  onClick={() => router.push(`/adoption/${animal.id}`)}
                >
                  <div className={styles.animalImage}>
                    <Image 
                      src={animal.photo} 
                      alt={animal.name} 
                      width={400}
                      height={400}
                      style={{ objectFit: 'cover' }}
                    />
                    {user.type === 'donor' && (
                      <div className={`${styles.statusBadge} ${styles[animal.status]}`}>
                        {animal.status === 'available' && 'Disponível'}
                        {animal.status === 'in_process' && 'Em Processo'}
                        {animal.status === 'adopted' && 'Adotado'}
                      </div>
                    )}
                  </div>
                  <div className={styles.animalInfo}>
                    <h3>{animal.name}</h3>
                    <p className={styles.animalBreed}>{animal.breed}</p>
                    <div className={styles.animalDetails}>
                      <span>{animal.ageInYears} {animal.ageInYears === 1 ? 'ano' : 'anos'}</span>
                      <span>•</span>
                      <span>{animal.size === 'small' ? 'Pequeno' : animal.size === 'medium' ? 'Médio' : 'Grande'}</span>
                      <span>•</span>
                      <span>{animal.type === 'dog' ? 'Cachorro' : animal.type === 'cat' ? 'Gato' : 'Outro'}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className={styles.modal} onClick={() => setShowLogoutConfirm(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Logout</h3>
            <p>Tem certeza que deseja sair?</p>
            <div className={styles.modalActions}>
              <Button 
                variant="secondary" 
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
