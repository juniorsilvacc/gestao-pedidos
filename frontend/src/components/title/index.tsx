import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface TitleProps {
  name: string,
  children: ReactNode,
}

export default function Title({children, name}: TitleProps) {
  return (
    <div className={styles.title}>
      {children}
      <span>{name}</span>
    </div>
  )
}
