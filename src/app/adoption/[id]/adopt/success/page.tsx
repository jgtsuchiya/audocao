'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Result } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from '@/presentation/components/atoms/Button';
import styles from './page.module.css';

export default function AdoptionSuccessPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Result
          icon={<CheckCircleOutlined className={styles.successIcon} />}
          status="success"
          title="Solicitação Enviada com Sucesso!"
          subTitle={
            <div className={styles.subtitle}>
              <p>
                Sua solicitação de adoção foi recebida e será analisada pela nossa equipe.
              </p>
              <p>
                Entraremos em contato através do e-mail e telefone informados em até 48 horas
                para agendar uma visita e dar continuidade ao processo.
              </p>
            </div>
          }
          className={styles.result}
        />

        <div className={styles.nextSteps}>
          <h2 className={styles.stepsTitle}>Próximos Passos</h2>
          <ol className={styles.stepsList}>
            <li className={styles.step}>
              <strong>Análise da Solicitação:</strong> Nossa equipe irá revisar suas informações
              e avaliar a adequação para adoção.
            </li>
            <li className={styles.step}>
              <strong>Contato Inicial:</strong> Entraremos em contato para agendar uma visita
              e conhecer melhor você e sua residência.
            </li>
            <li className={styles.step}>
              <strong>Visita ao Local:</strong> Um membro da equipe fará uma visita para
              verificar as condições do ambiente.
            </li>
            <li className={styles.step}>
              <strong>Conhecendo o Animal:</strong> Você terá a oportunidade de interagir com
              o animal e ver se há compatibilidade.
            </li>
            <li className={styles.step}>
              <strong>Finalização:</strong> Após aprovação, assinaremos o termo de adoção
              responsável e você poderá levar seu novo amigo para casa!
            </li>
          </ol>
        </div>

        <div className={styles.tips}>
          <h3 className={styles.tipsTitle}>💡 Enquanto aguarda</h3>
          <ul className={styles.tipsList}>
            <li>Prepare sua casa para receber o novo membro da família</li>
            <li>Providencie os itens essenciais (comedouro, bebedouro, caminha, brinquedos)</li>
            <li>Pesquise sobre os cuidados específicos da raça ou tipo do animal</li>
            <li>Se tiver outros pets, pense em como fazer a apresentação</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="large"
            onClick={() => router.push('/adoption')}
          >
            Ver Mais Animais
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() => router.push('/')}
          >
            Ir para Início
          </Button>
        </div>
      </div>
    </div>
  );
}
