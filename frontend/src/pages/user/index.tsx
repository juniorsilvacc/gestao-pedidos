import React, { FormEvent, useContext, useState } from 'react'
import Head from "next/head";
import styles from "./styles.module.css";
import { AuthContext } from '../../contexts/AuthContext';
import { FiUserPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Components
import Header from '../../components/header'
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';

export default function User() {
  const { register } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (name === '' || email === '' || cpf === '' || password === '') {
      return toast.warning("Preencha todos os campos")
    }

    setLoading(true);

    let data = {
      name,
      email,
      cpf,
      password
    }

    await register(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Cadastrar Usuário</title>
      </Head>
      <div>
        <Header />

        <div className={styles.content}>
          <div className={styles.title}>
            <FiUserPlus color="#000" size={24} />
            <h1>Usuários</h1>
          </div>

          <div className={styles.container}>
            <h1 className={styles.titlePageUser}>Cadastrar Usuário</h1>

            <div className={styles.login}>
              <form onSubmit={handleRegister}>
                <Input
                  placeholder="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="CPF"
                  type="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />

                <Input
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  Loading={loading}
                >
                  Cadastrar
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
