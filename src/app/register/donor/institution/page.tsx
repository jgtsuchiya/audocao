'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Select, Checkbox, message, Steps } from 'antd';
import { Button } from '@/presentation/components/atoms/Button';
import { MockUserRepository } from '@/infrastructure/repositories/mock/MockUserRepository';
import { MockApiService } from '@/infrastructure/http/api/mockApi';
import type { RegisterDonorInstitutionFormData } from '@/shared/types';
import { BRASIL_STATES, ACTIVITY_AREAS } from '@/shared/utils/constants';
import {
  validateCNPJ,
  validateCPF,
  validatePhone,
  validateCEP,
  validateEmail,
  validatePassword,
} from '@/shared/utils/validators';
import styles from './page.module.css';

const { Step } = Steps;

export default function DonorInstitutionPage() {
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
        return ['institutionName', 'cnpj', 'activityArea', 'institutionPhone'];
      case 1:
        return ['responsibleName', 'responsibleCpf', 'responsibleRole', 'responsiblePhone'];
      case 2:
        return ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
      case 3:
        return ['email', 'emailConfirmation', 'password', 'passwordConfirmation', 'acceptTerms'];
      default:
        return [];
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData: RegisterDonorInstitutionFormData = {
        institutionName: values.institutionName,
        cnpj: values.cnpj,
        activityArea: values.activityArea,
        institutionPhone: values.institutionPhone,
        website: values.website || '',
        responsibleName: values.responsibleName,
        responsibleCpf: values.responsibleCpf,
        responsibleRole: values.responsibleRole,
        responsiblePhone: values.responsiblePhone,
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

      await MockUserRepository.createDonorInstitution(formData);
      await MockApiService.sendConfirmationEmail(formData.email, formData.institutionName);
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

        <h1 className={styles.title}>Cadastro de Doador - Instituição</h1>

        <Steps current={currentStep} className={styles.steps}>
          <Step title="Instituição" />
          <Step title="Responsável" />
          <Step title="Endereço" />
          <Step title="Acesso" />
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
              <h2 className={styles.stepTitle}>Dados da Instituição</h2>

              <Form.Item
                label="Nome da Instituição"
                name="institutionName"
                rules={[{ required: true, message: 'Nome da instituição é obrigatório' }]}
              >
                <Input size="large" placeholder="Nome da ONG, abrigo ou instituição" />
              </Form.Item>

              <Form.Item
                label="CNPJ"
                name="cnpj"
                rules={[
                  { required: true, message: 'CNPJ é obrigatório' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const error = validateCNPJ(value);
                      return error ? Promise.reject(error) : Promise.resolve();
                    },
                  },
                ]}
              >
                <Input size="large" placeholder="00.000.000/0000-00" maxLength={18} />
              </Form.Item>

              <Form.Item
                label="Área de Atuação"
                name="activityArea"
                rules={[{ required: true, message: 'Área de atuação é obrigatória' }]}
              >
                <Select size="large" placeholder="Selecione a área de atuação">
                  {ACTIVITY_AREAS.map((area) => (
                    <Select.Option key={area.value} value={area.value}>
                      {area.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Telefone Institucional"
                name="institutionPhone"
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

              <Form.Item
                label="Website (opcional)"
                name="website"
                rules={[
                  {
                    type: 'url',
                    message: 'URL inválida',
                  },
                ]}
              >
                <Input size="large" placeholder="https://www.exemplo.com.br" />
              </Form.Item>
            </div>
          )}

          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Dados do Responsável</h2>

              <Form.Item
                label="Nome do Responsável"
                name="responsibleName"
                rules={[{ required: true, message: 'Nome do responsável é obrigatório' }]}
              >
                <Input size="large" placeholder="Nome completo do responsável" />
              </Form.Item>

              <Form.Item
                label="CPF do Responsável"
                name="responsibleCpf"
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
                label="Cargo"
                name="responsibleRole"
                rules={[{ required: true, message: 'Cargo é obrigatório' }]}
              >
                <Input size="large" placeholder="Presidente, Diretor, Coordenador, etc." />
              </Form.Item>

              <Form.Item
                label="Telefone do Responsável"
                name="responsiblePhone"
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

          {currentStep === 2 && (
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
                <Input size="large" placeholder="Sala, andar, etc." />
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

          {currentStep === 3 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Dados de Acesso</h2>

              <Form.Item
                label="E-mail Institucional"
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
                <Input size="large" type="email" placeholder="contato@instituicao.com.br" />
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
                <Input size="large" type="email" placeholder="Confirme o e-mail" />
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
                <Input.Password size="large" placeholder="Digite a senha" />
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
                <Input.Password size="large" placeholder="Confirme a senha" />
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
            {currentStep < 3 ? (
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
