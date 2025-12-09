'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Row, Col, Spin, Alert, Calendar, TimePicker } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button } from '@/presentation/components/atoms/Button';
import { Card } from '@/presentation/components/atoms/Card';
import type { Animal } from '@/shared/types';
import { MockAnimalRepository } from '@/infrastructure/repositories/mock/MockAnimalRepository';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import styles from './page.module.css';

dayjs.locale('pt-br');

export default function ScheduleVisitPage() {
  const params = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadAnimal = useCallback(async () => {
    setLoading(true);
    try {
      const id = params.id as string;
      const data = await MockAnimalRepository.findById(id);
      setAnimal(data);
    } catch (error) {
      console.error('Erro ao carregar animal:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadAnimal();
  }, [loadAnimal]);

  const handleGoBack = () => {
    router.push(`/adoption/${params.id}`);
  };

  const disabledDate = (current: Dayjs) => {
    // Não pode selecionar datas passadas e nem domingos
    return current && (current < dayjs().startOf('day') || current.day() === 0);
  };

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const onTimeChange = (time: Dayjs | null) => {
    setSelectedTime(time);
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    setSubmitting(true);
    
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirecionar para página de sucesso
    router.push(`/adoption/${params.id}/schedule/success`);
  };

  const isFormValid = selectedDate && selectedTime;

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" tip="Carregando informações..." />
      </div>
    );
  }

  if (!animal) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Alert
            message="Animal não encontrado"
            description="O animal que você está procurando não foi encontrado."
            type="warning"
            showIcon
            action={
              <Button onClick={() => router.push('/adoption')}>Voltar para listagem</Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="tertiary"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className={styles.backButton}
          aria-label="Voltar para detalhes"
        >
          Voltar
        </Button>
      </div>

      <div className={styles.content}>
        <Row gutter={[32, 32]}>
          <Col xs={24}>
            <Card className={styles.titleCard}>
              <div className={styles.titleSection}>
                <CalendarOutlined className={styles.titleIcon} />
                <div>
                  <h1 className={styles.title}>Agende uma Visita</h1>
                  <p className={styles.subtitle}>
                    Escolha a melhor data e horário para conhecer <strong>{animal.name}</strong>
                  </p>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card className={styles.calendarCard}>
              <h2 className={styles.sectionTitle}>
                <CalendarOutlined /> Escolha a Data
              </h2>
              <Alert
                message="Horário de funcionamento"
                description="Atendemos de segunda a sábado, das 9h às 18h."
                type="info"
                showIcon
                className={styles.infoAlert}
              />
              <Calendar
                fullscreen={false}
                disabledDate={disabledDate}
                onSelect={onDateSelect}
                className={styles.calendar}
              />
              {selectedDate && (
                <div className={styles.selectedInfo}>
                  <CheckCircleOutlined className={styles.checkIcon} />
                  Data selecionada: {selectedDate.format('DD/MM/YYYY')}
                </div>
              )}
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card className={styles.timeCard}>
              <h2 className={styles.sectionTitle}>
                <ClockCircleOutlined /> Escolha o Horário
              </h2>
              <p className={styles.timeDescription}>
                Selecione um horário entre 9h e 18h
              </p>
              <div className={styles.timePickerWrapper}>
                <TimePicker
                  format="HH:mm"
                  value={selectedTime}
                  onChange={onTimeChange}
                  minuteStep={30}
                  showNow={false}
                  placeholder="Selecione o horário"
                  size="large"
                  className={styles.timePicker}
                  disabledTime={() => ({
                    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23],
                  })}
                />
              </div>
              {selectedTime && (
                <div className={styles.selectedInfo}>
                  <CheckCircleOutlined className={styles.checkIcon} />
                  Horário selecionado: {selectedTime.format('HH:mm')}
                </div>
              )}

              {selectedDate && selectedTime && (
                <Alert
                  message="Resumo do Agendamento"
                  description={
                    <div>
                      <p><strong>Data:</strong> {selectedDate.format('DD/MM/YYYY (dddd)')}</p>
                      <p><strong>Horário:</strong> {selectedTime.format('HH:mm')}</p>
                      <p><strong>Pet:</strong> {animal.name}</p>
                    </div>
                  }
                  type="success"
                  showIcon
                  className={styles.summaryAlert}
                />
              )}
            </Card>
          </Col>

          <Col xs={24}>
            <div className={styles.actionSection}>
              <Button
                variant="secondary"
                size="large"
                onClick={handleGoBack}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="large"
                onClick={handleSchedule}
                disabled={!isFormValid}
                loading={submitting}
              >
                Confirmar Agendamento
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function CheckCircleOutlined(props: any) {
  return <span {...props}>✓</span>;
}
