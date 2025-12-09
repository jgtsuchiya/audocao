'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/presentation/components/atoms/Button';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'adopter';
  const isDonor = type === 'donor';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <CheckCircleOutlined className={styles.icon} />
        </div>

        <h1 className={styles.title}>Cadastro realizado com sucesso!</h1>

        {isDonor ? (
          <>
            <p className={styles.message}>
              Seu cadastro será analisado por nossa equipe. Você receberá um e-mail em até 48
              horas com a confirmação de aprovação.
            </p>
            <p className={styles.submessage}>
              Assim que aprovado, você poderá cadastrar animais para adoção e ajudar a conectá-los
              a lares amorosos.
            </p>
          </>
        ) : (
          <>
            <p className={styles.message}>
              Seu cadastro foi aprovado! Agora você já pode navegar pelos animais disponíveis para
              adoção.
            </p>
            <p className={styles.submessage}>
              Encontre seu novo melhor amigo e proporcione um lar cheio de amor e carinho.
            </p>
          </>
        )}

        <div className={styles.actions}>
          {isDonor ? (
            <Link href="/">
              <Button variant="primary" size="large">
                Voltar para início
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/">
                <Button variant="secondary" size="large">
                  Voltar para início
                </Button>
              </Link>
              <Link href="/adoption">
                <Button variant="primary" size="large">
                  Conhecer animais disponíveis
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className={styles.info}>
          <p className={styles.infoText}>
            📧 Um e-mail de confirmação foi enviado para sua caixa de entrada
          </p>
        </div>
      </div>
    </div>
  );
}
