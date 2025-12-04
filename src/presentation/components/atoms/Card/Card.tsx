'use client';

import React from 'react';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import styles from './Card.module.css';

export interface CardProps extends AntCardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AntCard
      className={`${styles.card} ${className || ''}`}
      {...props}
    >
      {children}
    </AntCard>
  );
};
