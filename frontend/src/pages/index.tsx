import type { NextPage } from 'next';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/home.module.css';

import logo from '../../public/logo.png';

// Components
import Input from '../components/forms/Input';
import Button from '../components/forms/Button'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo - Gestão de Pedidos" />

        <div className={styles.login}>
          <form>
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