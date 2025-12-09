'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Spin, Empty, Tag } from 'antd';
import { HeartOutlined, FilterOutlined, CheckCircleOutlined, MedicineBoxOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/presentation/components/atoms/Card';
import { Button } from '@/presentation/components/atoms/Button';
import { Select } from '@/presentation/components/atoms/Select';
import type { Animal, AnimalFilters } from '@/shared/types';
import { MockAnimalRepository } from '@/infrastructure/repositories/mock/MockAnimalRepository';
import {
  ANIMAL_TYPES,
  ANIMAL_AGES,
  ANIMAL_SIZES,
  ANIMAL_GENDERS,
} from '@/shared/utils/constants';
import styles from './page.module.css';

export default function AdoptionPage() {
  const router = useRouter();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AnimalFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const loadAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await MockAnimalRepository.findAll(filters);
      setAnimals(data);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadAnimals();
  }, [loadAnimals]);

  const handleFilterChange = (filterKey: keyof AnimalFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  const getAgeLabel = (age: string, ageInYears: number) => {
    if (age === 'puppy') return `${ageInYears < 1 ? Math.round(ageInYears * 12) + ' meses' : ageInYears + ' ano(s)'}`;
    return `${ageInYears} ano(s)`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="tertiary"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push('/home')}
          style={{ marginBottom: '16px', border: '2px solid white', color: 'white' }}
          aria-label="Voltar para home"
        >
          Voltar
        </Button>
        <div className={styles.headerContent}>
          <HeartOutlined className={styles.headerIcon} />
          <div>
            <h1 className={styles.title}>Animais para Adoção</h1>
            <p className={styles.subtitle}>
              Encontre seu novo companheiro e transforme uma vida
            </p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.filterSection}>
          <Button
            variant="secondary"
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
            className={styles.filterButton}
            aria-label="Abrir filtros"
            aria-expanded={showFilters}
          >
            Filtros
            {hasActiveFilters && (
              <Tag color="blue" className={styles.filterCount}>
                Ativos
              </Tag>
            )}
          </Button>

          {showFilters && (
            <div className={styles.filters} role="search" aria-label="Filtros de busca">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Select
                    label="Tipo de Animal"
                    placeholder="Todos"
                    options={[{ value: '', label: 'Todos' }, ...ANIMAL_TYPES]}
                    value={filters.type || ''}
                    onChange={(value) => handleFilterChange('type', value)}
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Select
                    label="Idade"
                    placeholder="Todas"
                    options={[{ value: '', label: 'Todas' }, ...ANIMAL_AGES]}
                    value={filters.age || ''}
                    onChange={(value) => handleFilterChange('age', value)}
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Select
                    label="Porte"
                    placeholder="Todos"
                    options={[{ value: '', label: 'Todos' }, ...ANIMAL_SIZES]}
                    value={filters.size || ''}
                    onChange={(value) => handleFilterChange('size', value)}
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Select
                    label="Sexo"
                    placeholder="Todos"
                    options={[{ value: '', label: 'Todos' }, ...ANIMAL_GENDERS]}
                    value={filters.gender || ''}
                    onChange={(value) => handleFilterChange('gender', value)}
                    allowClear
                  />
                </Col>
              </Row>
              {hasActiveFilters && (
                <div className={styles.filterActions}>
                  <Button variant="tertiary" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className={styles.loading}>
            <Spin size="large" tip="Carregando animais..." />
          </div>
        ) : animals.length === 0 ? (
          <Empty
            description="Nenhum animal encontrado com os filtros selecionados"
            className={styles.empty}
          >
            <Button onClick={clearFilters}>Limpar filtros</Button>
          </Empty>
        ) : (
          <>
            <div className={styles.results}>
              <p className={styles.resultsText}>
                {animals.length} {animals.length === 1 ? 'animal encontrado' : 'animais encontrados'}
              </p>
            </div>

            <Row gutter={[24, 24]}>
              {animals.map((animal) => (
                <Col xs={24} sm={12} md={8} lg={6} key={animal.id}>
                  <Card className={styles.animalCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={animal.photo}
                        alt={`Foto de ${animal.name}`}
                        className={styles.animalImage}
                        width={400}
                        height={400}
                        priority={false}
                      />
                      {animal.status === 'in_process' && (
                        <Tag color="orange" className={styles.statusTag}>
                          Em processo
                        </Tag>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.animalName}>{animal.name}</h3>
                      <div className={styles.animalInfo}>
                        <p className={styles.infoItem}>
                          <strong>Raça:</strong> {animal.breed}
                        </p>
                        <p className={styles.infoItem}>
                          <strong>Idade:</strong> {getAgeLabel(animal.age, animal.ageInYears)}
                        </p>
                        <p className={styles.infoItem}>
                          <strong>Porte:</strong>{' '}
                          {ANIMAL_SIZES.find((s) => s.value === animal.size)?.label}
                        </p>
                      </div>
                      <div className={styles.tags}>
                        {animal.vaccinated && (
                          <Tag color="green" className={styles.tag}>
                            <MedicineBoxOutlined style={{ marginRight: 4 }} />
                            Vacinado
                          </Tag>
                        )}
                        {animal.neutered && (
                          <Tag color="blue" className={styles.tag}>
                            <CheckCircleOutlined style={{ marginRight: 4 }} />
                            Castrado
                          </Tag>
                        )}
                      </div>
                      <Link href={`/adoption/${animal.id}`} passHref>
                        <Button
                          variant="primary"
                          fullWidth
                          className={styles.detailsButton}
                          disabled={animal.status === 'in_process'}
                        >
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
}
