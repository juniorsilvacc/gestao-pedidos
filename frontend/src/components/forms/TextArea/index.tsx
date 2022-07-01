import { TextareaHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

function TextArea ({...rest}: TextAreaProps) {
  return (
    <textarea  className={styles.textArea} {...rest}>
    </textarea>
  )
}

export default TextArea;