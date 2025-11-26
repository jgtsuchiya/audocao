'use client';

import React from 'react';
import Link from 'next/link';
import { HeartOutlined, HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button } from '@/presentation/components/atoms/Button';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>🐾 Audoção</h1>
          <nav className={styles.nav}>
            <Link href="/login">
              <Button variant="secondary">Entrar</Button>
            </Link>
            <Link href="/register/select-type">
              <Button variant="primary">Cadastrar-se</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Conectando animais a lares amorosos
            </h1>
            <p className={styles.heroSubtitle}>
              Ajudamos a encontrar o companheiro perfeito para sua família ou um lar para um
              animal que precisa de amor
            </p>
            <div className={styles.heroActions}>
              <Link href="/register/select-type">
                <Button size="large" variant="primary">
                  Começar agora
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.featuresTitle}>Como funciona</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <HeartOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              </div>
              <h3 className={styles.featureCardTitle}>Adotar um animal</h3>
              <p className={styles.featureCardDescription}>
                Encontre seu novo melhor amigo entre diversos animais disponíveis para adoção.
                Filtre por espécie, idade, tamanho e localização.
              </p>
              <Link href="/register/select-type">
                <Button variant="tertiary">Quero adotar →</Button>
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <HomeOutlined style={{ fontSize: 48, color: '#52c41a' }} />
              </div>
              <h3 className={styles.featureCardTitle}>Doar um animal</h3>
              <p className={styles.featureCardDescription}>
                Cadastre animais para adoção e ajude a encontrar um lar amoroso. Instituições e
                pessoas físicas são bem-vindas.
              </p>
              <Link href="/register/select-type">
                <Button variant="tertiary">Quero doar →</Button>
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <InfoCircleOutlined style={{ fontSize: 48, color: '#faad14' }} />
              </div>
              <h3 className={styles.featureCardTitle}>Sobre o projeto</h3>
              <p className={styles.featureCardDescription}>
                Nossa missão é facilitar o processo de adoção responsável, conectando doadores e
                adotantes de forma segura e transparente.
              </p>
              <Button variant="tertiary">Saiba mais →</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Audoção. Todos os direitos reservados.
          </p>
          <p className={styles.footerText}>
            Desenvolvido com 💙 para ajudar animais a encontrarem um lar
          </p>
        </div>
      </footer>
    </div>
  );
}
