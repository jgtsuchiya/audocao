'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, InputPassword } from '@/presentation/components/atoms/Input';
import { Button } from '@/presentation/components/atoms/Button';
import { Select, Checkbox, message } from 'antd';
import { MockUserRepository } from '@/infrastructure/repositories/mock/MockUserRepository';
import { MockApiService } from '@/infrastructure/http/api/mockApi';
import type { RegisterAdopterFormData } from '@/shared/types';
import { BRASIL_STATES, MARITAL_STATUS, RESIDENCE_TYPES, OWNERSHIP_TYPES } from '@/shared/utils/constants';
import {
  validateRequired,
  validateCPF,
  validatePhone,
  validateCEP,
  validateEmail,
  validatePassword,
  validateAge,
  validateEmailConfirmation,
  validatePasswordConfirmation,
  validateTerms,
} from '@/shared/utils/validators';
import styles from './page.module.css';

export default function RegisterAdopterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterAdopterFormData>({
    name: '',
    cpf: '',
    birthDate: '',
    phone: '',
    maritalStatus: '',
    occupation: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    residenceType: 'house',
    ownership: 'owned',
    hasYard: false,
    isScreened: false,
    hasOtherAnimals: false,
    otherAnimalsDetails: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterAdopterFormData, string>>>({});

  const handleChange = (name: keyof RegisterAdopterFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleCepBlur = async () => {
    const error = validateCEP(formData.cep);
    if (error) {
      setErrors((prev) => ({ ...prev, cep: error }));
      return;
    }

    try {
      const address = await MockApiService.fetchAddressByCep(formData.cep);
      if (address) {
        setFormData((prev) => ({
          ...prev,
          street: address.street,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
        }));
      }
    } catch (error) {
      console.error('Error fetching CEP:', error);
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof RegisterAdopterFormData, string>> = {};

    if (currentStep === 1) {
      newErrors.name = validateRequired(formData.name) || undefined;
      newErrors.cpf = validateCPF(formData.cpf) || undefined;
      newErrors.birthDate = validateAge(formData.birthDate) || undefined;
      newErrors.phone = validatePhone(formData.phone) || undefined;
      newErrors.maritalStatus = validateRequired(formData.maritalStatus) || undefined;
      newErrors.occupation = validateRequired(formData.occupation) || undefined;
    } else if (currentStep === 2) {
      newErrors.cep = validateCEP(formData.cep) || undefined;
      newErrors.street = validateRequired(formData.street) || undefined;
      newErrors.number = validateRequired(formData.number) || undefined;
      newErrors.neighborhood = validateRequired(formData.neighborhood) || undefined;
      newErrors.city = validateRequired(formData.city) || undefined;
      newErrors.state = validateRequired(formData.state) || undefined;
    } else if (currentStep === 4) {
      newErrors.email = validateEmail(formData.email) || undefined;
      newErrors.emailConfirmation =
        validateEmailConfirmation(formData.email, formData.emailConfirmation) || undefined;
      newErrors.password = validatePassword(formData.password) || undefined;
      newErrors.passwordConfirmation =
        validatePasswordConfirmation(formData.password, formData.passwordConfirmation) || undefined;
      newErrors.acceptTerms = validateTerms(formData.acceptTerms) || undefined;
    }

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== undefined)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setLoading(true);
    try {
      await MockUserRepository.createAdopter(formData);
      await MockApiService.sendConfirmationEmail(formData.email, formData.name);
      message.success('Cadastro realizado com sucesso!');
      router.push('/register/success?type=adopter');
    } catch (error: any) {
      message.error(error.message || 'Erro ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          🐾 Audoção
        </Link>

        <h1 className={styles.title}>Cadastro de Adotante</h1>
        <div className={styles.progress}>
          <span className={step >= 1 ? styles.progressActive : ''}>1</span>
          <span className={step >= 2 ? styles.progressActive : ''}>2</span>
          <span className={step >= 3 ? styles.progressActive : ''}>3</span>
          <span className={step >= 4 ? styles.progressActive : ''}>4</span>
        </div>

        <form className={styles.form}>
          {step === 1 && (
            <div className={styles.step}>
              <h2 className={styles.stepTitle}>Dados Pessoais</h2>
              <Input
                label="Nome completo"
                value={formData.name}
                error={errors.name}
                required
                onChange={(value) => handleChange('name', value)}
              />
              <Input
                label="CPF"
                mask="999.999.999-99"
                value={formData.cpf}
                error={errors.cpf}
                required
                onChange={(value) => handleChange('cpf', value)}
              />
              <Input
                label="Data de nascimento"
                type="date"
                value={formData.birthDate}
                error={errors.birthDate}
                required
                onChange={(value) => handleChange('birthDate', value)}
              />
              <Input
                label="Telefone"
                mask="(99) 99999-9999"
                value={formData.phone}
                error={errors.phone}
                required
                onChange={(value) => handleChange('phone', value)}
              />
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Estado civil<span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <Select
                  style={{ width: '100%', height: 44 }}
                  placeholder="Selecione"
                  value={formData.maritalStatus || undefined}
                  onChange={(value) => handleChange('maritalStatus', value)}
                  options={MARITAL_STATUS}
                  status={errors.maritalStatus ? 'error' : undefined}
                />
                {errors.maritalStatus && (
                  <span style={{ fontSize: 12, color: '#ff4d4f' }}>{errors.maritalStatus}</span>
                )}
              </div>
              <Input
                label="Profissão"
                value={formData.occupation}
                error={errors.occupation}
                required
                onChange={(value) => handleChange('occupation', value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className={styles.step}>
              <h2 className={styles.stepTitle}>Endereço</h2>
              <Input
                label="CEP"
                mask="99999-999"
                value={formData.cep}
                error={errors.cep}
                required
                onChange={(value) => handleChange('cep', value)}
                onBlur={handleCepBlur}
              />
              <Input
                label="Logradouro"
                value={formData.street}
                error={errors.street}
                required
                onChange={(value) => handleChange('street', value)}
              />
              <Input
                label="Número"
                value={formData.number}
                error={errors.number}
                required
                onChange={(value) => handleChange('number', value)}
              />
              <Input
                label="Complemento"
                value={formData.complement}
                onChange={(value) => handleChange('complement', value)}
              />
              <Input
                label="Bairro"
                value={formData.neighborhood}
                error={errors.neighborhood}
                required
                onChange={(value) => handleChange('neighborhood', value)}
              />
              <Input
                label="Cidade"
                value={formData.city}
                error={errors.city}
                required
                onChange={(value) => handleChange('city', value)}
              />
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Estado<span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <Select
                  style={{ width: '100%', height: 44 }}
                  placeholder="Selecione"
                  showSearch
                  value={formData.state || undefined}
                  onChange={(value) => handleChange('state', value)}
                  options={BRASIL_STATES}
                  status={errors.state ? 'error' : undefined}
                />
                {errors.state && (
                  <span style={{ fontSize: 12, color: '#ff4d4f' }}>{errors.state}</span>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.step}>
              <h2 className={styles.stepTitle}>Informações sobre Moradia</h2>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Tipo de residência<span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <Select
                  style={{ width: '100%', height: 44 }}
                  value={formData.residenceType}
                  onChange={(value) => handleChange('residenceType', value)}
                  options={RESIDENCE_TYPES}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Residência<span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <Select
                  style={{ width: '100%', height: 44 }}
                  value={formData.ownership}
                  onChange={(value) => handleChange('ownership', value)}
                  options={OWNERSHIP_TYPES}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Checkbox
                  checked={formData.hasYard}
                  onChange={(e) => handleChange('hasYard', e.target.checked)}
                >
                  Possui quintal?
                </Checkbox>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Checkbox
                  checked={formData.isScreened}
                  onChange={(e) => handleChange('isScreened', e.target.checked)}
                >
                  Residência telada? (para apartamentos)
                </Checkbox>
              </div>
              <div style={{ marginBottom: 24 }}>
                <Checkbox
                  checked={formData.hasOtherAnimals}
                  onChange={(e) => handleChange('hasOtherAnimals', e.target.checked)}
                >
                  Possui outros animais em casa?
                </Checkbox>
              </div>
              {formData.hasOtherAnimals && (
                <Input
                  label="Quais e quantos?"
                  value={formData.otherAnimalsDetails}
                  onChange={(value) => handleChange('otherAnimalsDetails', value)}
                  placeholder="Ex: 2 gatos, 1 cachorro"
                />
              )}
            </div>
          )}

          {step === 4 && (
            <div className={styles.step}>
              <h2 className={styles.stepTitle}>Dados de Acesso</h2>
              <Input
                label="E-mail"
                type="email"
                value={formData.email}
                error={errors.email}
                required
                onChange={(value) => handleChange('email', value)}
              />
              <Input
                label="Confirme o e-mail"
                type="email"
                value={formData.emailConfirmation}
                error={errors.emailConfirmation}
                required
                onChange={(value) => handleChange('emailConfirmation', value)}
              />
              <InputPassword
                label="Senha"
                value={formData.password}
                error={errors.password}
                required
                onChange={(value) => handleChange('password', value)}
              />
              <InputPassword
                label="Confirme a senha"
                value={formData.passwordConfirmation}
                error={errors.passwordConfirmation}
                required
                onChange={(value) => handleChange('passwordConfirmation', value)}
              />
              <div style={{ marginBottom: 24 }}>
                <Checkbox
                  checked={formData.acceptTerms}
                  onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                >
                  Aceito os termos de uso e política de privacidade
                </Checkbox>
                {errors.acceptTerms && (
                  <div style={{ fontSize: 12, color: '#ff4d4f', marginTop: 4 }}>
                    {errors.acceptTerms}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            {step > 1 && (
              <Button variant="secondary" size="large" onClick={handleBack}>
                Voltar
              </Button>
            )}
            {step < 4 ? (
              <Button variant="primary" size="large" onClick={handleNext}>
                Próximo
              </Button>
            ) : (
              <Button
                variant="primary"
                size="large"
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
              >
                Finalizar cadastro
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
