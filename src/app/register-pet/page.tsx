'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '@/presentation/hooks/useAuth';
import { Button } from '@/presentation/components/atoms/Button';
import { Input } from '@/presentation/components/atoms/Input';
import { Select } from '@/presentation/components/atoms/Select';
import { Textarea } from '@/presentation/components/atoms/Textarea';
import { Logo } from '@/presentation/components/atoms/Logo';
import { message } from 'antd';
import styles from './page.module.css';

export default function RegisterPetPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    color: '',
    weight: '',
    healthStatus: '',
    vaccinated: '',
    neutered: '',
    temperament: '',
    description: '',
    specialNeeds: '',
  });
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (!loading && (!isAuthenticated || user?.type !== 'donor')) {
      router.push('/home');
    }
  }, [isAuthenticated, user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Simulação de envio - em produção, chamaria uma API
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Pet cadastrado com sucesso!');
      router.push('/my-pets');
    } catch (error) {
      message.error('Erro ao cadastrar pet');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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
          <Button variant="tertiary" onClick={() => router.back()}>
            <ArrowLeftOutlined /> Voltar
          </Button>
          <h1><PlusOutlined /> Cadastrar Novo Pet</h1>
          <p>Preencha as informações do animal para disponibilizá-lo para adoção</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <section className={styles.formSection}>
            <h2>Informações Básicas</h2>
            <div className={styles.formGrid}>
              <Input
                label="Nome do Pet"
                placeholder="Ex: Rex"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                required
              />
              <Select
                label="Espécie"
                value={formData.species}
                onChange={(value) => setFormData({ ...formData, species: value })}
                options={[
                  { value: 'dog', label: 'Cachorro' },
                  { value: 'cat', label: 'Gato' },
                  { value: 'other', label: 'Outro' },
                ]}
                required
              />
              <Input
                label="Raça"
                placeholder="Ex: Labrador"
                value={formData.breed}
                onChange={(value) => setFormData({ ...formData, breed: value })}
                required
              />
              <Input
                label="Idade (anos)"
                type="number"
                placeholder="Ex: 3"
                value={formData.age}
                onChange={(value) => setFormData({ ...formData, age: value })}
                required
              />
              <Select
                label="Sexo"
                value={formData.gender}
                onChange={(value) => setFormData({ ...formData, gender: value })}
                options={[
                  { value: 'male', label: 'Macho' },
                  { value: 'female', label: 'Fêmea' },
                ]}
                required
              />
              <Select
                label="Porte"
                value={formData.size}
                onChange={(value) => setFormData({ ...formData, size: value })}
                options={[
                  { value: 'small', label: 'Pequeno' },
                  { value: 'medium', label: 'Médio' },
                  { value: 'large', label: 'Grande' },
                ]}
                required
              />
              <Input
                label="Cor"
                placeholder="Ex: Marrom"
                value={formData.color}
                onChange={(value) => setFormData({ ...formData, color: value })}
              />
              <Input
                label="Peso (kg)"
                type="number"
                placeholder="Ex: 15"
                value={formData.weight}
                onChange={(value) => setFormData({ ...formData, weight: value })}
              />
            </div>
          </section>

          <section className={styles.formSection}>
            <h2>Saúde</h2>
            <div className={styles.formGrid}>
              <Select
                label="Estado de Saúde"
                value={formData.healthStatus}
                onChange={(value) => setFormData({ ...formData, healthStatus: value })}
                options={[
                  { value: 'healthy', label: 'Saudável' },
                  { value: 'treatment', label: 'Em tratamento' },
                  { value: 'special_care', label: 'Cuidados especiais' },
                ]}
                required
              />
              <Select
                label="Vacinado"
                value={formData.vaccinated}
                onChange={(value) => setFormData({ ...formData, vaccinated: value })}
                options={[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'Não' },
                  { value: 'partial', label: 'Parcialmente' },
                ]}
                required
              />
              <Select
                label="Castrado"
                value={formData.neutered}
                onChange={(value) => setFormData({ ...formData, neutered: value })}
                options={[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'Não' },
                ]}
                required
              />
            </div>
          </section>

          <section className={styles.formSection}>
            <h2>Temperamento e Descrição</h2>
            <Select
              label="Temperamento"
              value={formData.temperament}
              onChange={(value) => setFormData({ ...formData, temperament: value })}
              options={[
                { value: 'calm', label: 'Calmo' },
                { value: 'playful', label: 'Brincalhão' },
                { value: 'energetic', label: 'Energético' },
                { value: 'shy', label: 'Tímido' },
                { value: 'sociable', label: 'Sociável' },
              ]}
              required
            />
            <Textarea
              label="Descrição"
              placeholder="Conte mais sobre o pet: personalidade, preferências, comportamento..."
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              rows={4}
              required
            />
            <Textarea
              label="Necessidades Especiais (opcional)"
              placeholder="Descreva se o pet possui alguma necessidade especial"
              value={formData.specialNeeds}
              onChange={(value) => setFormData({ ...formData, specialNeeds: value })}
              rows={3}
            />
          </section>

          <div className={styles.formActions}>
            <Button 
              type="button"
              variant="secondary" 
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              variant="primary" 
              loading={submitting}
              disabled={submitting}
            >
              Cadastrar Pet
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
