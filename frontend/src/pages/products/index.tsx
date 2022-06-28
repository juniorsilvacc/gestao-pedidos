import React from 'react';
import styles from "./styles.module.css";
import Head from "next/head";

// Components
import Header from '../../components/header';

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

// api
import { ApiClient } from '../../services/api';


export default function Products() {
  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Dashboard</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1 className={styles.title}>Todos os produtos</h1>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  const api = ApiClient(context)

  const response = await api.get("/api/products/category");

  return {
    props: {
      products: response.data
    }
  }
})

