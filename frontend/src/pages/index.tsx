import { useContext, FormEvent, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
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
import { toast } from 'react-toastify';

// Utils
import { SSRGuest } from '../utils/SSRGuest'
import { parseCookies } from 'nookies';

export default function Home() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (email === '' || password === '') {
      return toast.warning("Preencha todos os campos")
    }

    setLoading(true);

    let data = {
      email,
      password
    }
    
    await login(data);

    setLoading(false);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Entrar
            </Button>
          </form>

          <p className={styles.text}>Não possui um cadastro? <Link href="/register"><a>Cadastre-se</a></Link></p>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  // Se tentar acessar a página já logado, tenho que redirecionar para a página /dashboard
  if (cookies["@auth.token"]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
    }
  }
}