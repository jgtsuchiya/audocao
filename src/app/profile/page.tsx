'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, UserOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useAuth } from '@/presentation/hooks/useAuth';
import { Button } from '@/presentation/components/atoms/Button';
import { Input } from '@/presentation/components/atoms/Input';
import { Card } from '@/presentation/components/atoms/Card';
import { Logo } from '@/presentation/components/atoms/Logo';
import type { Adopter, DonorPerson, DonorInstitution } from '@/shared/types';
import { message } from 'antd';
import styles from './page.module.css';

export default function ProfilePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Em produção, chamaria uma API para salvar
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Perfil atualizado com sucesso!');
      setEditMode(false);
    } catch (error) {
      message.error('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
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

  const renderAdopterProfile = (adopter: Adopter) => (
    <>
      <section className={styles.section}>
        <h2>Informações Pessoais</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>Nome Completo</label>
            {editMode ? (
              <Input
                value={formData.name || ''}
                onChange={(value) => setFormData({ ...formData, name: value })}
              />
            ) : (
              <p>{adopter.name}</p>
            )}
          </div>
          <div className={styles.infoItem}>
            <label>CPF</label>
            <p>{adopter.cpf}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Data de Nascimento</label>
            <p>{new Date(adopter.birthDate).toLocaleDateString('pt-BR')}</p>
          </div>
          <div className={styles.infoItem}>
            <label>E-mail</label>
            <p>{adopter.email}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Telefone</label>
            {editMode ? (
              <Input
                value={formData.phone || ''}
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />
            ) : (
              <p>{adopter.phone}</p>
            )}
          </div>
          <div className={styles.infoItem}>
            <label>Estado Civil</label>
            {editMode ? (
              <Input
                value={formData.maritalStatus || ''}
                onChange={(value) => setFormData({ ...formData, maritalStatus: value })}
              />
            ) : (
              <p>{adopter.maritalStatus}</p>
            )}
          </div>
          <div className={styles.infoItem}>
            <label>Profissão</label>
            {editMode ? (
              <Input
                value={formData.occupation || ''}
                onChange={(value) => setFormData({ ...formData, occupation: value })}
              />
            ) : (
              <p>{adopter.occupation}</p>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Endereço</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>CEP</label>
            <p>{adopter.address.cep}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Rua</label>
            <p>{adopter.address.street}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Número</label>
            <p>{adopter.address.number}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Bairro</label>
            <p>{adopter.address.neighborhood}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Cidade</label>
            <p>{adopter.address.city}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Estado</label>
            <p>{adopter.address.state}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Informações de Moradia</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>Tipo de Residência</label>
            <p>{adopter.housingInfo.residenceType === 'house' ? 'Casa' : 'Apartamento'}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Situação</label>
            <p>{adopter.housingInfo.ownership === 'owned' ? 'Própria' : 'Alugada'}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Possui Quintal</label>
            <p>{adopter.housingInfo.hasYard ? 'Sim' : 'Não'}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Possui Telas</label>
            <p>{adopter.housingInfo.isScreened ? 'Sim' : 'Não'}</p>
          </div>
          <div className={styles.infoItem}>
            <label>Possui Outros Animais</label>
            <p>{adopter.housingInfo.hasOtherAnimals ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      </section>
    </>
  );

  const renderDonorProfile = (donor: DonorPerson | DonorInstitution) => {
    const isPerson = 'name' in donor;
    
    return (
      <>
        <section className={styles.section}>
          <h2>Informações {isPerson ? 'Pessoais' : 'da Instituição'}</h2>
          <div className={styles.infoGrid}>
            {isPerson ? (
              <>
                <div className={styles.infoItem}>
                  <label>Nome Completo</label>
                  <p>{(donor as DonorPerson).name}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>CPF</label>
                  <p>{(donor as DonorPerson).cpf}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Data de Nascimento</label>
                  <p>{new Date((donor as DonorPerson).birthDate).toLocaleDateString('pt-BR')}</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.infoItem}>
                  <label>Nome da Instituição</label>
                  <p>{(donor as DonorInstitution).institutionName}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>CNPJ</label>
                  <p>{(donor as DonorInstitution).cnpj}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Área de Atuação</label>
                  <p>{(donor as DonorInstitution).activityArea}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Telefone da Instituição</label>
                  <p>{(donor as DonorInstitution).institutionPhone}</p>
                </div>
                {(donor as DonorInstitution).website && (
                  <div className={styles.infoItem}>
                    <label>Website</label>
                    <p>{(donor as DonorInstitution).website}</p>
                  </div>
                )}
              </>
            )}
            <div className={styles.infoItem}>
              <label>E-mail</label>
              <p>{donor.email}</p>
            </div>
            {isPerson && (
              <div className={styles.infoItem}>
                <label>Telefone</label>
                <p>{(donor as DonorPerson).phone}</p>
              </div>
            )}
          </div>
        </section>

        {!isPerson && (
          <section className={styles.section}>
            <h2>Responsável</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Nome</label>
                <p>{(donor as DonorInstitution).responsibleName}</p>
              </div>
              <div className={styles.infoItem}>
                <label>CPF</label>
                <p>{(donor as DonorInstitution).responsibleCpf}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Cargo</label>
                <p>{(donor as DonorInstitution).responsibleRole}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Telefone</label>
                <p>{(donor as DonorInstitution).responsiblePhone}</p>
              </div>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2>Endereço</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>CEP</label>
              <p>{donor.address.cep}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Rua</label>
              <p>{donor.address.street}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Número</label>
              <p>{donor.address.number}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Bairro</label>
              <p>{donor.address.neighborhood}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Cidade</label>
              <p>{donor.address.city}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Estado</label>
              <p>{donor.address.state}</p>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Logo size="small" variant="both" />
          <Button variant="secondary" onClick={() => router.push('/home')} style={{ border: '2px solid white', color: 'white' }}>
            Voltar
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div>
            <Button variant="tertiary" onClick={() => router.back()}>
              <ArrowLeftOutlined /> Voltar
            </Button>
            <h1><UserOutlined /> Meu Perfil</h1>
            <p>Visualize e edite suas informações pessoais</p>
          </div>
          {!editMode ? (
            <Button variant="primary" onClick={() => setEditMode(true)}>
              <EditOutlined /> Editar Perfil
            </Button>
          ) : (
            <div className={styles.editActions}>
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSave} loading={saving}>
                <SaveOutlined /> Salvar
              </Button>
            </div>
          )}
        </div>

        <Card className={styles.profileCard}>
          {user.type === 'adopter' 
            ? renderAdopterProfile(user as Adopter)
            : renderDonorProfile(user as DonorPerson | DonorInstitution)
          }
        </Card>
      </main>
    </div>
  );
}
