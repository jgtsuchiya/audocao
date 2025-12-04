'use client';

import React from 'react';
import { Input } from 'antd';
import type { TextAreaProps as AntTextAreaProps } from 'antd/es/input';
import styles from './Textarea.module.css';

const { TextArea: AntTextArea } = Input;

export interface TextareaProps extends Omit<AntTextAreaProps, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  required,
  onChange,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.textareaWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <AntTextArea
        {...props}
        onChange={handleChange}
        status={error ? 'error' : undefined}
        className={`${styles.textarea} ${className || ''}`}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
