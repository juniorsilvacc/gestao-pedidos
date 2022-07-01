import React, { SelectHTMLAttributes } from 'react'
import styles from './styles.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{}

function Select({...rest}: SelectProps) {
  return (
    <select
      className={styles.select}
      {...rest}
    >
    </select>
  )
}

export default Select
