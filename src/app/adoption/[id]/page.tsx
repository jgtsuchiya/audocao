'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Row, Col, Tag, Spin, Divider, Alert } from 'antd';
import {
  ArrowLeftOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  ScissorOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { Card } from '@/presentation/components/atoms/Card';
import { Button } from '@/presentation/components/atoms/Button';
import type { Animal } from '@/shared/types';
import { MockAnimalRepository } from '@/infrastructure/repositories/mock/MockAnimalRepository';
import {
  ANIMAL_TYPES,
  ANIMAL_AGES,
  ANIMAL_SIZES,
  ANIMAL_GENDERS,
} from '@/shared/utils/constants';
import styles from './page.module.css';

export default function AnimalDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const loadAnimal = useCallback(async () => {
    setLoading(true);
    try {
      const id = params.id as string;
      const data = await MockAnimalRepository.findById(id);
      if (data) {
        setAnimal(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Erro ao carregar animal:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadAnimal();
  }, [loadAnimal]);

  const handleAdopt = () => {
    router.push(`/adoption/${params.id}/adopt`);
  };

  const handleGoBack = () => {
    router.push('/adoption');
  };

  const getAgeLabel = (age: string, ageInYears: number) => {
    if (age === 'puppy' && ageInYears < 1) {
      return `${Math.round(ageInYears * 12)} meses`;
    }
    return `${ageInYears} ano${ageInYears !== 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" tip="Carregando informações..." />
      </div>
    );
  }

  if (notFound || !animal) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Alert
            message="Animal não encontrado"
            description="O animal que você está procurando não foi encontrado."
            type="warning"
            showIcon
            action={
              <Button onClick={handleGoBack}>Voltar para listagem</Button>
            }
          />
        </div>
      </div>
    );
  }

  const isAvailable = animal.status === 'available';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="tertiary"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className={styles.backButton}
          aria-label="Voltar para listagem"
        >
          Voltar
        </Button>
      </div>

      <div className={styles.content}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={10}>
            <Card className={styles.imageCard}>
              <div className={styles.mainImageWrapper}>
                <Image
                  src={animal.photo}
                  alt={`Foto de ${animal.name}`}
                  className={styles.mainImage}
                  width={600}
                  height={600}
                  priority
                />
                {!isAvailable && (
                  <Tag color="orange" className={styles.statusTag}>
                    Em processo de adoção
                  </Tag>
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} md={14}>
            <div className={styles.details}>
              <div className={styles.nameSection}>
                <h1 className={styles.animalName}>{animal.name}</h1>
                <HeartOutlined className={styles.heartIcon} />
              </div>

              <div className={styles.quickInfo}>
                <Tag color="blue" className={styles.infoTag}>
                  {ANIMAL_TYPES.find((t) => t.value === animal.type)?.label}
                </Tag>
                <Tag color="purple" className={styles.infoTag}>
                  {animal.breed}
                </Tag>
                <Tag color="green" className={styles.infoTag}>
                  {getAgeLabel(animal.age, animal.ageInYears)}
                </Tag>
                <Tag color="orange" className={styles.infoTag}>
                  {ANIMAL_SIZES.find((s) => s.value === animal.size)?.label}
                </Tag>
                <Tag className={styles.infoTag}>
                  {ANIMAL_GENDERS.find((g) => g.value === animal.gender)?.label}
                </Tag>
              </div>

              <Divider />

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Sobre {animal.name}</h2>
                <p className={styles.description}>{animal.description}</p>
              </div>

              <Divider />

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Personalidade</h2>
                <div className={styles.personality}>
                  {animal.personality.map((trait) => (
                    <Tag key={trait} color="cyan" className={styles.personalityTag}>
                      {trait}
                    </Tag>
                  ))}
                </div>
              </div>

              <Divider />

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Informações de Saúde</h2>
                <p className={styles.description}>{animal.healthInfo}</p>
                <div className={styles.healthStatus}>
                  <div className={styles.healthItem}>
                    {animal.vaccinated ? (
                      <MedicineBoxOutlined className={styles.iconSuccess} style={{ fontSize: 20 }} />
                    ) : (
                      <CloseCircleOutlined className={styles.iconError} />
                    )}
                    <span>Vacinado</span>
                  </div>
                  <div className={styles.healthItem}>
                    {animal.neutered ? (
                      <ScissorOutlined className={styles.iconSuccess} style={{ fontSize: 20 }} />
                    ) : (
                      <CloseCircleOutlined className={styles.iconError} />
                    )}
                    <span>Castrado</span>
                  </div>
                </div>
                {animal.specialNeeds && (
                  <Alert
                    message="Necessidades Especiais"
                    description={animal.specialNeeds}
                    type="info"
                    showIcon
                    className={styles.specialNeeds}
                  />
                )}
              </div>

              <Divider />

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Processo de Adoção</h2>
                <p className={styles.description}>{animal.adoptionProcess}</p>
              </div>

              <Divider />

              <div className={styles.actionSection}>
                {isAvailable ? (
                  <>
                    <Alert
                      message="Interessado em adotar?"
                      description="Preencha nosso formulário e entraremos em contato para agendar uma visita!"
                      type="success"
                      showIcon
                      className={styles.adoptAlert}
                    />
                    <Button
                      variant="primary"
                      size="large"
                      icon={<CalendarOutlined />}
                      onClick={handleAdopt}
                      className={styles.adoptButton}
                    >
                      Marcar um Encontro
                    </Button>
                  </>
                ) : (
                  <Alert
                    message="Animal em processo de adoção"
                    description="Este animal já está em processo de adoção. Explore outros animais disponíveis!"
                    type="warning"
                    showIcon
                    action={
                      <Button onClick={handleGoBack}>Ver outros animais</Button>
                    }
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
