import React, { useState, FormEvent } from 'react';

// Icons
import { BiCategory } from 'react-icons/bi';

// Styles
import styles from '../Add-Category/styles.module.css';
import { toast } from 'react-toastify';

// Components
import Header from '../../components/Header'
import Input from '../../components/Input';
import Button from '../../components/Button';
import Title from '../../components/Title';

// API
import api from '../../services/api';

interface RegisterProps {
  name: string;
  email: string;
  cpf: string;
  password: string;
  e: FormEvent;
}

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleCreate(e: FormEvent){
    e.preventDefault();

    try {
      if (name === '' || email === '' || cpf === '' || password === '') {
        return toast.warning("Preencha todos os campos.")
      }
  
      setLoading(true);

      await api.post("/api/users/register", {
        name,
        email,
        cpf,
        password
      });

      toast.success("Usuário criado");

      setLoading(false);
    } catch (error) {
      return toast.error("Ocorreu um erro ao cadastrar usuário.");
    }

    setName('');
    setEmail('');
    setCpf('');
    setPassword('');
  }

  return (
    <>
      <Header />

      <div className={styles.content}>
        <Title name="Usuários">
          <BiCategory color="#000" size={24} />
        </Title>

        <main className={styles.container}>
          <h1 className={styles.title}>Cadastrar Usuário</h1>
          
          <div className={styles.category}>
            <form onSubmit={handleCreate}>
              <Input
                placeholder="Nome"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                placeholder="E-mail"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="CPF"
                type="text"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />

              <Input
                placeholder="Senha"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                loading={loading}
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
