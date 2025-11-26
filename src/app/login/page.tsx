'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, InputPassword } from '@/presentation/components/atoms/Input';
import { Button } from '@/presentation/components/atoms/Button';
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

    const emailErr = validateEmail(email);
    const passwordErr = validateRequired(password);

    setEmailError(emailErr || '');
    setPasswordError(passwordErr || '');

    if (emailErr || passwordErr) {
      return;
    }

    setLoading(true);

    try {
      const token = await MockAuthRepository.login({ email, password });
      message.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error: any) {
      message.error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          <Link href="/" className={styles.logo}>
            🐾 Audoção
          </Link>

          <h1 className={styles.title}>Entrar</h1>
          <p className={styles.subtitle}>Bem-vindo de volta!</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              error={emailError}
              required
              onChange={setEmail}
            />

            <InputPassword
              label="Senha"
              placeholder="••••••••"
              value={password}
              error={passwordError}
              required
              onChange={setPassword}
            />

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
