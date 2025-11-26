'use client';

import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import ReactInputMask from 'react-input-mask';
import styles from './Input.module.css';

export interface InputProps extends Omit<AntInputProps, 'onChange'> {
  label?: string;
  error?: string;
  mask?: string;
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  mask,
  required,
  onChange,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const inputElement = mask ? (
    <ReactInputMask mask={mask} onChange={handleChange} {...props}>
      {(inputProps: any) => (
        <AntInput
          {...inputProps}
          status={error ? 'error' : undefined}
          className={`${styles.input} ${className || ''}`}
        />
      )}
    </ReactInputMask>
  ) : (
    <AntInput
      {...props}
      onChange={handleChange}
      status={error ? 'error' : undefined}
      className={`${styles.input} ${className || ''}`}
    />
  );

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {inputElement}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export const InputPassword: React.FC<Omit<InputProps, 'type'>> = (props) => {
  return <Input {...props} type="password" />;
};
