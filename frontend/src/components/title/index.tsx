import React, { ReactNode } from 'react';
import styles from './styles.module.css';

export default function Title({children, name}) {
  return (
    <div className={styles.title}>
      {children}
      <span>{name}</span>
    </div>
  )
}
