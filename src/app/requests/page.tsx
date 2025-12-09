'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useAuth } from '@/presentation/hooks/useAuth';
import { Button } from '@/presentation/components/atoms/Button';
import { Card } from '@/presentation/components/atoms/Card';
import { Logo } from '@/presentation/components/atoms/Logo';
import { message, Modal } from 'antd';
import styles from './page.module.css';

interface Request {
  id: string;
  animalId: string;
  animalName: string;
  animalImage: string;
  adopterName: string;
  adopterEmail: string;
  adopterPhone: string;
  adoptionReason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export default function RequestsPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.type !== 'donor')) {
      router.push('/home');
    }
  }, [isAuthenticated, user, loading, router]);

  useEffect(() => {
    if (user && user.type === 'donor') {
      // Mock data - em produção viria de uma API
      setRequests([
        {
          id: '1',
          animalId: '1',
          animalName: 'Rex',
          animalImage: '/placeholder-dog.jpg',
          adopterName: 'Maria Silva',
          adopterEmail: 'maria@email.com',
          adopterPhone: '(11) 98765-4321',
          adoptionReason: 'Sempre quis ter um cachorro e tenho espaço adequado em casa.',
          status: 'pending',
          createdAt: new Date('2024-12-05'),
        },
      ]);
    }
  }, [user]);

  const handleApprove = (requestId: string, animalName: string) => {
    Modal.confirm({
      title: 'Aprovar Solicitação',
      content: `Tem certeza que deseja aprovar a adoção de ${animalName}?`,
      okText: 'Sim, aprovar',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          // Em produção, chamaria uma API
          setRequests(requests.map(r => 
            r.id === requestId ? { ...r, status: 'approved' as const } : r
          ));
          message.success('Solicitação aprovada com sucesso!');
        } catch (error) {
          message.error('Erro ao aprovar solicitação');
        }
      },
    });
  };

  const handleReject = (requestId: string, animalName: string) => {
    Modal.confirm({
      title: 'Rejeitar Solicitação',
      content: `Tem certeza que deseja rejeitar a solicitação de adoção de ${animalName}?`,
      okText: 'Sim, rejeitar',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          // Em produção, chamaria uma API
          setRequests(requests.map(r => 
            r.id === requestId ? { ...r, status: 'rejected' as const } : r
          ));
          message.success('Solicitação rejeitada');
        } catch (error) {
          message.error('Erro ao rejeitar solicitação');
        }
      },
    });
  };

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status: Request['status']) => {
    const badges = {
      pending: { icon: <ClockCircleOutlined />, text: 'Pendente', className: styles.statusPending },
      approved: { icon: <CheckOutlined />, text: 'Aprovada', className: styles.statusApproved },
      rejected: { icon: <CloseOutlined />, text: 'Rejeitada', className: styles.statusRejected },
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

  if (!isAuthenticated || !user || user.type !== 'donor') {
    return null;
  }

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

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
          <h1>Solicitações de Adoção</h1>
          <p>Gerencie as solicitações recebidas para seus pets</p>
        </div>

        {requests.length === 0 ? (
          <Card className={styles.emptyState}>
            <h3>Nenhuma solicitação recebida</h3>
            <p>Quando alguém se interessar em adotar um dos seus pets, as solicitações aparecerão aqui.</p>
            <Button variant="primary" onClick={() => router.push('/my-pets')}>
              Ver Meus Pets
            </Button>
          </Card>
        ) : (
          <>
            {pendingRequests.length > 0 && (
              <section className={styles.requestsSection}>
                <h2>Pendentes ({pendingRequests.length})</h2>
                <div className={styles.requestsList}>
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className={styles.requestCard}>
                      <div className={styles.requestImage}>
                        <Image 
                          src={request.animalImage} 
                          alt={request.animalName}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.requestInfo}>
                        <div className={styles.requestHeader}>
                          <div>
                            <h3>{request.animalName}</h3>
                            <p className={styles.adopterName}>{request.adopterName}</p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className={styles.requestDate}>
                          Solicitado em {request.createdAt.toLocaleDateString('pt-BR')}
                        </p>
                        <p className={styles.reason}>
                          <strong>Motivo:</strong> {request.adoptionReason.substring(0, 100)}
                          {request.adoptionReason.length > 100 ? '...' : ''}
                        </p>
                      </div>
                      <div className={styles.requestActions}>
                        <Button 
                          variant="tertiary" 
                          onClick={() => handleViewDetails(request)}
                        >
                          Ver Detalhes
                        </Button>
                        <Button 
                          variant="primary" 
                          onClick={() => handleApprove(request.id, request.animalName)}
                        >
                          <CheckOutlined /> Aprovar
                        </Button>
                        <Button 
                          variant="secondary" 
                          onClick={() => handleReject(request.id, request.animalName)}
                        >
                          <CloseOutlined /> Rejeitar
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {processedRequests.length > 0 && (
              <section className={styles.requestsSection}>
                <h2>Processadas ({processedRequests.length})</h2>
                <div className={styles.requestsList}>
                  {processedRequests.map((request) => (
                    <Card key={request.id} className={styles.requestCard}>
                      <div className={styles.requestImage}>
                        <Image 
                          src={request.animalImage} 
                          alt={request.animalName}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.requestInfo}>
                        <div className={styles.requestHeader}>
                          <div>
                            <h3>{request.animalName}</h3>
                            <p className={styles.adopterName}>{request.adopterName}</p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className={styles.requestDate}>
                          Solicitado em {request.createdAt.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className={styles.requestActions}>
                        <Button 
                          variant="tertiary" 
                          onClick={() => handleViewDetails(request)}
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Modal
        title="Detalhes da Solicitação"
        open={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
        footer={null}
        width={600}
      >
        {selectedRequest && (
          <div className={styles.modalContent}>
            <h3>{selectedRequest.animalName}</h3>
            <div className={styles.detailsGrid}>
              <div>
                <strong>Adotante:</strong>
                <p>{selectedRequest.adopterName}</p>
              </div>
              <div>
                <strong>E-mail:</strong>
                <p>{selectedRequest.adopterEmail}</p>
              </div>
              <div>
                <strong>Telefone:</strong>
                <p>{selectedRequest.adopterPhone}</p>
              </div>
              <div>
                <strong>Data da solicitação:</strong>
                <p>{selectedRequest.createdAt.toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            <div>
              <strong>Motivo da adoção:</strong>
              <p>{selectedRequest.adoptionReason}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
