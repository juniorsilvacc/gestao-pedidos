import React from 'react'
import styles from './styles.module.css';

function Select() {
  return (
    <select
      className={styles.select}
    >
      <option>Bebidas</option>
      <option>Pizzas</option>
    </select>
  )
}

export default Select
