'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, InputPassword } from '@/presentation/components/atoms/Input';
import { Button } from '@/presentation/components/atoms/Button';
import { Logo } from '@/presentation/components/atoms/Logo';
import { MockAuthRepository } from '@/infrastructure/repositories/mock/MockAuthRepository';
import { validateEmail, validateRequired } from '@/shared/utils/validators';
import { message } from 'antd';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    let hasError = false;

    const emailValidation = validateEmail(email);
    if (emailValidation) {
      setEmailError(emailValidation);
      hasError = true;
    } else {
      setEmailError('');
    }

    const passwordValidation = validateRequired(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) return;

    setLoading(true);

    try {
      console.log('Tentando fazer login com:', email);
      const result = await MockAuthRepository.login({ email, password });
      console.log('Login bem-sucedido:', result);
      message.success('Login realizado com sucesso!');
      console.log('Navegando para /home');
      router.push('/home');
    } catch (error: any) {
      console.error('Erro no login:', error);
      message.error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          <Link href="/" className={styles.logoLink}>
            <Logo size="medium" variant="both" />
          </Link>

          <h1 className={styles.title}>
            <LockOutlined style={{ marginRight: 8 }} />
            Entrar
          </h1>
          <p className={styles.subtitle}>Bem-vindo de volta!</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div style={{ position: 'relative' }}>
              <UserOutlined style={{ position: 'absolute', left: 12, top: 40, color: '#8c8c8c', fontSize: 16, zIndex: 1 }} />
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={email}
                error={emailError}
                required
                onChange={setEmail}
                style={{ paddingLeft: 40 }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <LockOutlined style={{ position: 'absolute', left: 12, top: 40, color: '#8c8c8c', fontSize: 16, zIndex: 1 }} />
              <InputPassword
                label="Senha"
                placeholder="••••••••"
                value={password}
                error={passwordError}
                required
                onChange={setPassword}
                style={{ paddingLeft: 40 }}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Entrar
            </Button>
          </form>

          <div className={styles.links}>
            <Link href="/forgot-password" className={styles.link}>
              Esqueci minha senha
            </Link>
            <p className={styles.signupText}>
              Não tem conta?{' '}
              <Link href="/register/select-type" className={styles.link}>
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className={styles.demo}>
            <p className={styles.demoTitle}>Credenciais de teste:</p>
            <p className={styles.demoText}>Doador: doador@email.com / Senha123!</p>
            <p className={styles.demoText}>Adotante: adotante@email.com / Senha123!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
