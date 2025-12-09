'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  HeartOutlined, 
  HomeOutlined, 
  SafetyOutlined,
} from '@ant-design/icons';
import { Button } from '@/presentation/components/atoms/Button';
import { Logo } from '@/presentation/components/atoms/Logo';
import { useAuth } from '@/presentation/hooks/useAuth';
import styles from './page.module.css';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return null;
  }

  return (
    <div className={styles.container}>
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
              <Link href="/adoption">
                <button className={styles.primaryActionButton}>
                  <HeartOutlined className={styles.heartIcon} />
                  Ver Animais para Adoção
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.featuresTitle}>Como funciona</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <HeartOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
              </div>
              <h3 className={styles.featureCardTitle}>Adotar um animal</h3>
              <p className={styles.featureCardDescription}>
                Encontre seu novo melhor amigo entre diversos animais disponíveis para adoção.
                Filtre por espécie, idade, tamanho e localização.
              </p>
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
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <SafetyOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              </div>
              <h3 className={styles.featureCardTitle}>Adoção Responsável</h3>
              <p className={styles.featureCardDescription}>
                Processo seguro e transparente, garantindo o bem-estar dos animais e a
                responsabilidade dos adotantes.
              </p>
              <Button variant="tertiary">Saiba mais →</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Logo size="small" variant="both" />
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Audoção. Todos os direitos reservados.
          </p>
          <p className={styles.footerText}>
            <HeartOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />
            Desenvolvido com amor para ajudar animais a encontrarem um lar
          </p>
        </div>
      </footer>
    </div>
  );
}
