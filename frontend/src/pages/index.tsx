import type { NextPage } from 'next';
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/home.module.css';

import logo from '../../public/logo.png';

// Components
import Input from '../components/forms/Input';
import Button from '../components/forms/Button'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo - Gestão de Pedidos" />

        <div className={styles.login}>
          <form>
            <Input
              placeholder="Digite seu Email"
              type="email"
              required
            />

            <Input
              placeholder="Digite sua Senha"
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

          <p className={styles.text}>Não possui um cadastro? <a>Cadastre-se</a></p>
        </div>
      </div>
    </>
  )
}

export default Home
