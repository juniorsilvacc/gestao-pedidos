import { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

function Input ({...rest}: InputProps) {
  return (
    <input
      className={styles.input}
      {...rest}
    />
  )
}

export default Input;