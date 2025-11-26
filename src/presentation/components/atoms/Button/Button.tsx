'use client';

import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import styles from './Button.module.css';

export interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className,
  ...props
}) => {
  const getButtonType = (): AntButtonProps['type'] => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'tertiary':
        return 'text';
      default:
        return 'primary';
    }
  };

  return (
    <AntButton
      type={getButtonType()}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </AntButton>
  );
};
