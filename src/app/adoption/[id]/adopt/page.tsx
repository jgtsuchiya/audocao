'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Row, Col, Spin, Alert, Checkbox, Radio } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Input } from '@/presentation/components/atoms/Input';
import { Button } from '@/presentation/components/atoms/Button';
import { Select } from '@/presentation/components/atoms/Select';
import { Textarea } from '@/presentation/components/atoms/Textarea';
import type { Animal, AdoptionRequestFormData } from '@/shared/types';
import { MockAnimalRepository } from '@/infrastructure/repositories/mock/MockAnimalRepository';
import { MockApiService } from '@/infrastructure/http/api/mockApi';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateCEP,
} from '@/shared/utils/validators';
import { BRASIL_STATES, INCOME_RANGES, INFO_MESSAGES } from '@/shared/utils/constants';
import styles from './page.module.css';

interface FormErrors {
  [key: string]: string | null;
}

export default function AdoptFormPage() {
  const params = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  
  const [formData, setFormData] = useState<AdoptionRequestFormData>({
    name: '',
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    adoptionReason: '',
    monthlyIncome: '',
    hasChildren: false,
    childrenAges: '',
    hasExperience: false,
    experienceDetails: '',
    allResidentsAgree: false,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  const handleInputChange = (field: keyof AdoptionRequestFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof AdoptionRequestFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = formData[field];
    if (value !== undefined) {
      validateField(field, value);
    }
  };

  const validateField = (field: keyof AdoptionRequestFormData, value: string | boolean) => {
    let error: string | null = null;

    switch (field) {
      case 'name':
        error = validateRequired(value as string);
        if (!error && (value as string).trim().split(' ').length < 2) {
          error = 'Por favor, informe seu nome completo';
        }
        if (!error && (value as string).length < 3) {
          error = 'O nome deve ter no mínimo 3 caracteres';
        }
        break;
      case 'email':
        error = validateEmail(value as string);
        break;
      case 'phone':
        error = validatePhone(value as string);
        break;
      case 'cep':
        error = validateCEP(value as string);
        break;
      case 'street':
      case 'number':
      case 'neighborhood':
      case 'city':
      case 'state':
        error = validateRequired(value as string);
        break;
      case 'adoptionReason':
        error = validateRequired(value as string);
        if (!error && (value as string).length < 50) {
          error = 'Por favor, descreva o motivo para adoção (mínimo 50 caracteres)';
        }
        if (!error && (value as string).length > 1000) {
          error = 'O motivo não pode ter mais de 1000 caracteres';
        }
        break;
      case 'monthlyIncome':
        error = validateRequired(value as string);
        break;
      case 'childrenAges':
        if (formData.hasChildren && !value) {
          error = 'Por favor, informe as idades das crianças';
        }
        break;
      case 'experienceDetails':
        if (formData.hasExperience && !value) {
          error = 'Por favor, descreva sua experiência com animais';
        }
        break;
      case 'allResidentsAgree':
        if (!value) {
          error = 'Todos os moradores devem concordar com a adoção';
        }
        break;
      case 'acceptTerms':
        if (!value) {
          error = 'Você deve aceitar os termos para continuar';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleCepChange = async (cep: string) => {
    handleInputChange('cep', cep);

    if (cep.replace(/\D/g, '').length === 8) {
      setCepLoading(true);
      try {
        const address = await MockApiService.fetchAddressByCep(cep);
        if (address) {
          setFormData((prev) => ({
            ...prev,
            cep: address.cep,
            street: address.street,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
          }));
          setErrors((prev) => ({
            ...prev,
            street: null,
            neighborhood: null,
            city: null,
            state: null,
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setCepLoading(false);
      }
    }
  };

  const validateForm = (): boolean => {
    const fields: (keyof AdoptionRequestFormData)[] = [
      'name',
      'email',
      'phone',
      'cep',
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
      'adoptionReason',
      'monthlyIncome',
      'allResidentsAgree',
      'acceptTerms',
    ];

    if (formData.hasChildren) fields.push('childrenAges');
    if (formData.hasExperience) fields.push('experienceDetails');

    const newErrors: FormErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field];
      if (value !== undefined) {
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setTouched(
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) {
        (firstError as HTMLElement).focus();
      }
      return;
    }

    setSubmitting(true);
    try {
      await MockAnimalRepository.createAdoptionRequest(params.id as string, formData);
      router.push(`/adoption/${params.id}/adopt/success`);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação. Por favor, tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.push(`/adoption/${params.id}`);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" tip="Carregando..." />
      </div>
    );
  }

  if (!animal) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Alert
            message="Animal não encontrado"
            type="error"
            showIcon
            action={
              <Button onClick={() => router.push('/adoption')}>
                Voltar para listagem
              </Button>
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
          style={{ border: '2px solid white', color: 'white' }}
          aria-label="Voltar para detalhes do animal"
        >
          Voltar
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.formCard}>
          <div className={styles.animalInfo}>
            <h1 className={styles.title}>Solicitar Adoção</h1>
            <p className={styles.subtitle}>
              Você está interessado em adotar <strong>{animal.name}</strong>
            </p>
          </div>

          <Alert
            message="Preencha o formulário abaixo"
            description="Todas as informações são importantes para avaliarmos a melhor adequação e garantir o bem-estar do animal."
            type="info"
            showIcon
            className={styles.alert}
          />

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Dados Pessoais */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Dados Pessoais</h2>
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Input
                    label="Nome Completo"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    onBlur={() => handleBlur('name')}
                    error={touched.name ? errors.name || undefined : undefined}
                    required
                    aria-invalid={!!errors.name}
                    maxLength={150}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Input
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    onBlur={() => handleBlur('email')}
                    error={touched.email ? errors.email || undefined : undefined}
                    required
                    aria-invalid={!!errors.email}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Input
                    label="Telefone"
                    mask="(99) 99999-9999"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    onBlur={() => handleBlur('phone')}
                    error={touched.phone ? errors.phone || undefined : undefined}
                    required
                    aria-invalid={!!errors.phone}
                  />
                </Col>
              </Row>
            </section>

            {/* Endereço */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Endereço</h2>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Input
                    label="CEP"
                    mask="99999-999"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={handleCepChange}
                    onBlur={() => handleBlur('cep')}
                    error={touched.cep ? errors.cep || undefined : undefined}
                    required
                    aria-invalid={!!errors.cep}
                    disabled={cepLoading}
                  />
                  {cepLoading && (
                    <span className={styles.cepLoading}>
                      {INFO_MESSAGES['cep.loading']}
                    </span>
                  )}
                </Col>
                <Col xs={24} sm={16}>
                  <Input
                    label="Logradouro"
                    placeholder="Rua, Avenida, etc."
                    value={formData.street}
                    onChange={(value) => handleInputChange('street', value)}
                    onBlur={() => handleBlur('street')}
                    error={touched.street ? errors.street || undefined : undefined}
                    required
                    aria-invalid={!!errors.street}
                    disabled={cepLoading}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Input
                    label="Número"
                    placeholder="123"
                    value={formData.number}
                    onChange={(value) => handleInputChange('number', value)}
                    onBlur={() => handleBlur('number')}
                    error={touched.number ? errors.number || undefined : undefined}
                    required
                    aria-invalid={!!errors.number}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Input
                    label="Complemento"
                    placeholder="Apto, Bloco, etc."
                    value={formData.complement}
                    onChange={(value) => handleInputChange('complement', value)}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Input
                    label="Bairro"
                    placeholder="Nome do bairro"
                    value={formData.neighborhood}
                    onChange={(value) => handleInputChange('neighborhood', value)}
                    onBlur={() => handleBlur('neighborhood')}
                    error={touched.neighborhood ? errors.neighborhood || undefined : undefined}
                    required
                    aria-invalid={!!errors.neighborhood}
                    disabled={cepLoading}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Input
                    label="Cidade"
                    placeholder="Nome da cidade"
                    value={formData.city}
                    onChange={(value) => handleInputChange('city', value)}
                    onBlur={() => handleBlur('city')}
                    error={touched.city ? errors.city || undefined : undefined}
                    required
                    aria-invalid={!!errors.city}
                    disabled={cepLoading}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Select
                    label="Estado"
                    placeholder="Selecione o estado"
                    options={BRASIL_STATES}
                    value={formData.state}
                    onChange={(value) => handleInputChange('state', value)}
                    error={touched.state ? errors.state || undefined : undefined}
                    required
                    disabled={cepLoading}
                  />
                </Col>
              </Row>
            </section>

            {/* Informações sobre Adoção */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Informações sobre a Adoção</h2>
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Textarea
                    label="Motivo para Adoção"
                    placeholder="Conte-nos por que você deseja adotar este animal e como pretende cuidar dele (mínimo 50 caracteres)"
                    value={formData.adoptionReason}
                    onChange={(value) => handleInputChange('adoptionReason', value)}
                    onBlur={() => handleBlur('adoptionReason')}
                    error={touched.adoptionReason ? errors.adoptionReason || undefined : undefined}
                    required
                    rows={4}
                    maxLength={1000}
                    showCount
                    aria-invalid={!!errors.adoptionReason}
                  />
                </Col>
                <Col xs={24}>
                  <Select
                    label="Renda Mensal"
                    placeholder="Selecione sua faixa de renda"
                    options={INCOME_RANGES}
                    value={formData.monthlyIncome}
                    onChange={(value) => handleInputChange('monthlyIncome', value)}
                    error={touched.monthlyIncome ? errors.monthlyIncome || undefined : undefined}
                    required
                  />
                </Col>
              </Row>
            </section>

            {/* Informações Adicionais */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Informações Adicionais</h2>
              <div className={styles.radioSection}>
                <label className={styles.radioLabel}>
                  Há crianças na residência? <span className={styles.required}>*</span>
                </label>
                <Radio.Group
                  value={formData.hasChildren}
                  onChange={(e) => handleInputChange('hasChildren', e.target.value)}
                >
                  <Radio value={true}>Sim</Radio>
                  <Radio value={false}>Não</Radio>
                </Radio.Group>
              </div>

              {formData.hasChildren && (
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col xs={24}>
                    <Input
                      label="Idades das Crianças"
                      placeholder="Ex: 5 e 8 anos"
                      value={formData.childrenAges}
                      onChange={(value) => handleInputChange('childrenAges', value)}
                      onBlur={() => handleBlur('childrenAges')}
                      error={touched.childrenAges ? errors.childrenAges || undefined : undefined}
                      required
                      aria-invalid={!!errors.childrenAges}
                    />
                  </Col>
                </Row>
              )}

              <div className={styles.radioSection}>
                <label className={styles.radioLabel}>
                  Possui experiência com animais?
                </label>
                <Radio.Group
                  value={formData.hasExperience}
                  onChange={(e) => handleInputChange('hasExperience', e.target.value)}
                >
                  <Radio value={true}>Sim</Radio>
                  <Radio value={false}>Não</Radio>
                </Radio.Group>
              </div>

              {formData.hasExperience && (
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col xs={24}>
                    <Textarea
                      label="Descreva sua Experiência"
                      placeholder="Conte sobre sua experiência com animais"
                      value={formData.experienceDetails}
                      onChange={(value) => handleInputChange('experienceDetails', value)}
                      onBlur={() => handleBlur('experienceDetails')}
                      error={touched.experienceDetails ? errors.experienceDetails || undefined : undefined}
                      required
                      rows={3}
                      aria-invalid={!!errors.experienceDetails}
                    />
                  </Col>
                </Row>
              )}
            </section>

            {/* Termos e Confirmação */}
            <section className={styles.section}>
              <div className={styles.checkboxGroup}>
                <Checkbox
                  checked={formData.allResidentsAgree}
                  onChange={(e) => handleInputChange('allResidentsAgree', e.target.checked)}
                  className={errors.allResidentsAgree ? styles.checkboxError : ''}
                >
                  Todos os moradores da residência concordam com a adoção{' '}
                  <span className={styles.required}>*</span>
                </Checkbox>
                {touched.allResidentsAgree && errors.allResidentsAgree && (
                  <span className={styles.error}>{errors.allResidentsAgree}</span>
                )}
              </div>

              <div className={styles.checkboxGroup}>
                <Checkbox
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className={errors.acceptTerms ? styles.checkboxError : ''}
                >
                  Declaro que as informações prestadas são verdadeiras e concordo com os{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    termos de adoção responsável
                  </a>{' '}
                  <span className={styles.required}>*</span>
                </Checkbox>
                {touched.acceptTerms && errors.acceptTerms && (
                  <span className={styles.error}>{errors.acceptTerms}</span>
                )}
              </div>
            </section>

            <div className={styles.actions}>
              <Button
                variant="secondary"
                onClick={handleGoBack}
                disabled={submitting}
                size="large"
                htmlType="button"
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                loading={submitting}
                disabled={submitting}
                size="large"
                htmlType="submit"
              >
                {submitting ? 'Enviando...' : 'Enviar Solicitação'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
