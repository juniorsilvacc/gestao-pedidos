import { useContext, FormEvent } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/home.module.css';

import logo from '../../public/logo.png';

// Components
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';

// Hooks
import { AuthContext } from '../contexts/AuthContext';

const Home: NextPage = () => {
  const { login } = useContext(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      email: 'junior@gmail.com',
      password: '123456'
    }

    await login(data)
  }

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo - Gestão de Pedidos" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Email"
              type="email"
              required
            />

            <Input
              placeholder="Senha"
              type="password"
              required
            />

            <Button
              type="submit"
              Loading={false}
            >
              Entrar
            </Button>
          </form>

          <p className={styles.text}>Não possui um cadastro? <Link href="/register"><a>Cadastre-se</a></Link></p>
        </div>
      </div>
    </>
  )
}

export default Home
