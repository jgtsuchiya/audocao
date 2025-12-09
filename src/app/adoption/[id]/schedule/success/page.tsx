'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircleOutlined, CalendarOutlined, HomeOutlined } from '@ant-design/icons';
import { Button } from '@/presentation/components/atoms/Button';
import { Card } from '@/presentation/components/atoms/Card';
import confetti from 'canvas-confetti';
import styles from './page.module.css';

export default function ScheduleSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animação de confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Mostrar conteúdo após pequeno delay
    setTimeout(() => setShowContent(true), 100);

    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    router.push('/adoption');
  };

  const handleViewDetails = () => {
    router.push(`/adoption/${params.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Card className={`${styles.successCard} ${showContent ? styles.show : ''}`}>
          <div className={styles.iconWrapper}>
            <CheckCircleOutlined className={styles.successIcon} />
          </div>
          
          <h1 className={styles.title}>Encontro Agendado com Sucesso!</h1>
          
          <p className={styles.message}>
            Que ótima notícia! Seu encontro foi confirmado e estamos muito felizes que você 
            está interessado em adotar.
          </p>

          <div className={styles.infoBox}>
            <CalendarOutlined className={styles.infoIcon} />
            <div className={styles.infoContent}>
              <h3>Próximos Passos</h3>
              <ul>
                <li>Você receberá um e-mail de confirmação com todos os detalhes</li>
                <li>Lembre-se de chegar 10 minutos antes do horário agendado</li>
                <li>Traga um documento com foto para a visita</li>
                <li>Prepare suas dúvidas para conversarmos durante o encontro</li>
              </ul>
            </div>
          </div>

          <div className={styles.tips}>
            <h3 className={styles.tipsTitle}>Dicas para a Visita</h3>
            <div className={styles.tipsGrid}>
              <div className={styles.tipCard}>
                <span className={styles.tipEmoji}>👕</span>
                <p>Use roupas confortáveis</p>
              </div>
              <div className={styles.tipCard}>
                <span className={styles.tipEmoji}>❤️</span>
                <p>Venha com o coração aberto</p>
              </div>
              <div className={styles.tipCard}>
                <span className={styles.tipEmoji}>❓</span>
                <p>Faça perguntas sobre o pet</p>
              </div>
              <div className={styles.tipCard}>
                <span className={styles.tipEmoji}>⏰</span>
                <p>Seja pontual</p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="secondary"
              size="large"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className={styles.actionButton}
            >
              Ver Outros Pets
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={handleViewDetails}
              className={styles.actionButton}
            >
              Voltar para Detalhes
            </Button>
          </div>

          <div className={styles.footer}>
            <p>
              Alguma dúvida? Entre em contato conosco pelo e-mail{' '}
              <a href="mailto:contato@adocao.com.br">contato@adocao.com.br</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
