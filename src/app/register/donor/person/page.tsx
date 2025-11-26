'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, DatePicker, Select, Checkbox, message, Steps } from 'antd';
import { Button } from '@/presentation/components/atoms/Button';
import { MockUserRepository } from '@/infrastructure/repositories/mock/MockUserRepository';
import { MockApiService } from '@/infrastructure/http/api/mockApi';
import type { RegisterDonorPersonFormData } from '@/shared/types';
import { BRASIL_STATES } from '@/shared/utils/constants';
import {
  validateCPF,
  validatePhone,
  validateCEP,
  validateEmail,
  validatePassword,
  validateAge,
} from '@/shared/utils/validators';
import dayjs from 'dayjs';
import styles from './page.module.css';

const { Step } = Steps;

export default function DonorPersonPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const handleCepBlur = async () => {
    const cep = form.getFieldValue('cep');
    if (!cep) return;

    const cepError = validateCEP(cep);
    if (cepError) return;

    setLoadingCep(true);
    try {
      const address = await MockApiService.fetchAddressByCep(cep);
      if (address) {
        form.setFieldsValue({
          street: address.street,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
        });
        message.success('Endereço encontrado!');
      } else {
        message.warning('CEP não encontrado');
      }
    } catch (error) {
      message.error('Erro ao buscar CEP');
    } finally {
      setLoadingCep(false);
    }
  };

  const handleNext = async () => {
    try {
      const fieldsToValidate = getFieldsByStep(currentStep);
      await form.validateFields(fieldsToValidate);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error('Por favor, preencha todos os campos obrigatórios corretamente');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const getFieldsByStep = (step: number) => {
    switch (step) {
      case 0:
        return ['name', 'cpf', 'birthDate', 'phone'];
      case 1:
        return ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
      case 2:
        return ['email', 'emailConfirmation', 'password', 'passwordConfirmation', 'acceptTerms'];
      default:
        return [];
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData: RegisterDonorPersonFormData = {
        name: values.name,
        cpf: values.cpf,
        birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : '',
        phone: values.phone,
        cep: values.cep,
        street: values.street,
        number: values.number,
        complement: values.complement || '',
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
        email: values.email,
        emailConfirmation: values.emailConfirmation,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        acceptTerms: values.acceptTerms,
      };

      await MockUserRepository.createDonorPerson(formData);
      await MockApiService.sendConfirmationEmail(formData.email, formData.name);
      message.success('Cadastro realizado com sucesso!');
      router.push('/register/success?type=donor');
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

        <h1 className={styles.title}>Cadastro de Doador - Pessoa Física</h1>

        <Steps current={currentStep} className={styles.steps}>
          <Step title="Dados Pessoais" />
          <Step title="Endereço" />
          <Step title="Dados de Acesso" />
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          {currentStep === 0 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Dados Pessoais</h2>

              <Form.Item
                label="Nome completo"
                name="name"
                rules={[{ required: true, message: 'Nome é obrigatório' }]}
              >
                <Input size="large" placeholder="Seu nome completo" />
              </Form.Item>

              <Form.Item
                label="CPF"
                name="cpf"
                rules={[
                  { required: true, message: 'CPF é obrigatório' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const error = validateCPF(value);
                      return error ? Promise.reject(error) : Promise.resolve();
                    },
                  },
                ]}
              >
                <Input size="large" placeholder="000.000.000-00" maxLength={14} />
              </Form.Item>

              <Form.Item
                label="Data de nascimento"
                name="birthDate"
                rules={[
                  { required: true, message: 'Data de nascimento é obrigatória' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      try {
                        const error = validateAge(value.format('YYYY-MM-DD'));
                        return error ? Promise.reject(error) : Promise.resolve();
                      } catch (e) {
                        return Promise.reject('Data inválida');
                      }
                    },
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  placeholder="Selecione a data"
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  disabledDate={(current) => current && current > dayjs().endOf('day')}
                />
              </Form.Item>

              <Form.Item
                label="Telefone"
                name="phone"
                rules={[
                  { required: true, message: 'Telefone é obrigatório' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const error = validatePhone(value);
                      return error ? Promise.reject(error) : Promise.resolve();
                    },
                  },
                ]}
              >
                <Input size="large" placeholder="(00) 00000-0000" maxLength={15} />
              </Form.Item>
            </div>
          )}

          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Endereço</h2>

              <Form.Item
                label="CEP"
                name="cep"
                rules={[
                  { required: true, message: 'CEP é obrigatório' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const error = validateCEP(value);
                      return error ? Promise.reject(error) : Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="00000-000"
                  maxLength={9}
                  onBlur={handleCepBlur}
                  suffix={loadingCep ? 'Buscando...' : null}
                />
              </Form.Item>

              <Form.Item
                label="Logradouro"
                name="street"
                rules={[{ required: true, message: 'Logradouro é obrigatório' }]}
              >
                <Input size="large" placeholder="Nome da rua" />
              </Form.Item>

              <Form.Item
                label="Número"
                name="number"
                rules={[{ required: true, message: 'Número é obrigatório' }]}
              >
                <Input size="large" placeholder="Número" />
              </Form.Item>

              <Form.Item label="Complemento" name="complement">
                <Input size="large" placeholder="Apartamento, bloco, etc." />
              </Form.Item>

              <Form.Item
                label="Bairro"
                name="neighborhood"
                rules={[{ required: true, message: 'Bairro é obrigatório' }]}
              >
                <Input size="large" placeholder="Bairro" />
              </Form.Item>

              <Form.Item
                label="Cidade"
                name="city"
                rules={[{ required: true, message: 'Cidade é obrigatória' }]}
              >
                <Input size="large" placeholder="Cidade" />
              </Form.Item>

              <Form.Item
                label="Estado"
                name="state"
                rules={[{ required: true, message: 'Estado é obrigatório' }]}
              >
                <Select size="large" placeholder="Selecione o estado" showSearch>
                  {BRASIL_STATES.map((state) => (
                    <Select.Option key={state.value} value={state.value}>
                      {state.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Dados de Acesso</h2>

              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: 'E-mail é obrigatório' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const error = validateEmail(value);
                      return error ? Promise.reject(error) : Promise.resolve();
                    },
                  },
                ]}
              >
                <Input size="large" type="email" placeholder="seu@email.com" />
              </Form.Item>

              <Form.Item
                label="Confirme o e-mail"
                name="emailConfirmation"
                dependencies={['email']}
                rules={[
                  { required: true, message: 'Confirmação de e-mail é obrigatória' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('email') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Os e-mails não conferem'));
                    },
                  }),
                ]}
              >
                <Input size="large" type="email" placeholder="Confirme seu e-mail" />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  { required: true, message: 'Senha é obrigatória' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const error = validatePassword(value);
                      return error ? Promise.reject(error) : Promise.resolve();
                    },
                  },
                ]}
                extra="Mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais"
              >
                <Input.Password size="large" placeholder="Digite sua senha" />
              </Form.Item>

              <Form.Item
                label="Confirme a senha"
                name="passwordConfirmation"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Confirmação de senha é obrigatória' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não conferem'));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="Confirme sua senha" />
              </Form.Item>

              <Form.Item
                name="acceptTerms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Você deve aceitar os termos de uso')),
                  },
                ]}
              >
                <Checkbox>Aceito os termos de uso e política de privacidade</Checkbox>
              </Form.Item>
            </div>
          )}

          <div className={styles.actions}>
            {currentStep > 0 && (
              <Button variant="secondary" size="large" onClick={handleBack}>
                Voltar
              </Button>
            )}
            {currentStep === 0 && (
              <Link href="/register/donor-type">
                <Button variant="secondary" size="large">
                  Voltar
                </Button>
              </Link>
            )}
            {currentStep < 2 ? (
              <Button variant="primary" size="large" onClick={handleNext}>
                Próximo
              </Button>
            ) : (
              <Button
                variant="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Finalizar cadastro
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
