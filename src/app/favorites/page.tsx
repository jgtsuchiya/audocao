'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '@/presentation/hooks/useAuth';
import { Button } from '@/presentation/components/atoms/Button';
import { Card } from '@/presentation/components/atoms/Card';
import { Logo } from '@/presentation/components/atoms/Logo';
import { message } from 'antd';
import styles from './page.module.css';

interface FavoriteAnimal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  image: string;
  donorName: string;
  addedDate: Date;
}

export default function FavoritesPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteAnimal[]>([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (user && user.type === 'adopter') {
      // Mock data - em produção viria de uma API
      setFavorites([]);
    }
  }, [user]);

  const handleRemoveFavorite = (animalId: string) => {
    setFavorites(favorites.filter(fav => fav.id !== animalId));
    message.success('Pet removido dos favoritos');
  };

  const handleViewDetails = (animalId: string) => {
    router.push(`/adoption/${animalId}`);
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
          <Button variant="tertiary" onClick={() => router.back()}>
            <ArrowLeftOutlined /> Voltar
          </Button>
          <h1><HeartFilled style={{ color: '#ff4d4f' }} /> Meus Favoritos</h1>
          <p>Pets que você salvou para adoção futura</p>
        </div>

        {favorites.length === 0 ? (
          <Card className={styles.emptyState}>
            <HeartFilled style={{ fontSize: '4rem', color: '#d9d9d9', marginBottom: '1rem' }} />
            <h3>Nenhum favorito ainda</h3>
            <p>Quando você favoritar um pet, ele aparecerá aqui para você acessar facilmente.</p>
            <Button variant="primary" onClick={() => router.push('/adoption')}>
              Buscar Pets para Adotar
            </Button>
          </Card>
        ) : (
          <div className={styles.favoritesGrid}>
            {favorites.map((animal) => (
              <Card key={animal.id} className={styles.favoriteCard}>
                <div className={styles.favoriteImage}>
                  <Image 
                    src={animal.image} 
                    alt={animal.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <button 
                    className={styles.removeFavorite}
                    onClick={() => handleRemoveFavorite(animal.id)}
                    aria-label="Remover dos favoritos"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
                <div className={styles.favoriteInfo}>
                  <h3>{animal.name}</h3>
                  <p className={styles.animalDetails}>
                    {animal.species} • {animal.breed} • {animal.age} {animal.age === 1 ? 'ano' : 'anos'}
                  </p>
                  <p className={styles.donorName}>
                    Doador: {animal.donorName}
                  </p>
                  <p className={styles.addedDate}>
                    Favoritado em {animal.addedDate.toLocaleDateString('pt-BR')}
                  </p>
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => handleViewDetails(animal.id)}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
