import React, { TextareaHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export default function Textarea ({...rest}: TextAreaProps) {
  return (
    <textarea  className={styles.textArea} {...rest}>
    </textarea>
  )
}