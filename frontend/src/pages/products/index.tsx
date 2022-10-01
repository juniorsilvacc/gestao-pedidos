import React, { useState } from 'react';
import styles from "./styles.module.css";
import Head from "next/head";

// Components
import Header from '../../components/header';

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

// api
import { ApiClient } from '../../services/api';

type ListProductsProps = {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

interface ProductsProps{
  products: ListProductsProps[];
}


export default function Products({ products }: ProductsProps) {
  const [productsList, setProductsList] = useState(products || []);

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Dashboard</title>
      </Head>

      <div>
        <Header />

        <h1 className={styles.title}>Todos os Produtos</h1>
        
        <main className={styles.container}>
          

          {productsList.map(item => (
            <div key={item.id} className={styles.containerItem}>
              <div className={styles.item}>
                <img src={`http://localhost:3333/public/${item.banner}`} alt={item.name} />
                <h1 className={styles.name}>{item.name}</h1>
                <p className={styles.price}>R$ {item.price},00</p>
              </div>
            </div>
          ))}

        </main>
      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  // const api = ApiClient(context)

  // const response = await api.get("/api/products/category");

  return {
    props: {
      // products: response.data
    }
  }
})

