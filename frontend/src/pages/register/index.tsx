import type { NextPage } from 'next';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from '../../../styles/home.module.css';

// Components
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Faça seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1 className={styles.title}>Cadastre-se</h1>

        <div className={styles.login}>
          <form>
             <Input
              placeholder="Nome"
              type="text"
              required
            />

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
              Cadastrar
            </Button>
          </form>

          <p className={styles.text}>Não possui um cadastro? <Link href="/">Entrar</Link></p>
        </div>
      </div>
    </>
  )
}

export default Register
