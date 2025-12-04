'use client';

import React from 'react';
import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<AntSelectProps, 'options' | 'onChange'> {
  label?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  required,
  onChange,
  className,
  ...props
}) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.selectWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <AntSelect
        {...props}
        options={options}
        onChange={handleChange}
        status={error ? 'error' : undefined}
        className={`${styles.select} ${className || ''}`}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
