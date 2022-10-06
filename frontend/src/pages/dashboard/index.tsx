import React, { useState } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./styles.module.css";
import Modal from 'react-modal';

// Icons
import { FiRefreshCcw } from 'react-icons/fi';
import { MdOutlineFastfood } from 'react-icons/md';

// Components
import Header from '../../components/header';
import Title from "../../components/title";

// Api
import { getAPIClient } from "../../services/axios";

type ListOrdersProps = {
  id: string;
  name: string | null;
  table: string | number;
  status: boolean;
  draft: boolean;
}

interface OrdersProps {
  orders: ListOrdersProps[];
}

export default function Dashboard({ orders }: OrdersProps) {
  const [ordersList, setOrdersList] = useState(orders || []);

  async function handleRefresh() {
    const api = getAPIClient();

    const response = await api.get('/api/orders/list')

    setOrdersList(response.data);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Dashboard</title>
      </Head>
      <div>
        <Header />

        <div className={styles.content}>
          
          <Title name="Pedidos">
            <MdOutlineFastfood color="#000" size={24} />
          </Title>

          <div className={styles.container}>

          <div className={styles.blockRefresh}>
            <h1 className={styles.title}>Pedidos</h1>
            <button onClick={handleRefresh}>
              <FiRefreshCcw color="#EA1D2C" size={22}/>
            </button>
          </div>

          <article className={styles.orders}>
          {ordersList.map(order => (
            <section key={order.id} className={styles.orderItem}>
              <button>
                <div className={styles.tag}>
                  <span>Nº da Mesa: <b>{order.table}</b></span>
                </div>
              </button>
            </section>
          ))}

          {ordersList.length === 0 && (
            <span className={styles.empty}>Não há pedidos</span>
          )}
          </article>

          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['@auth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const response = await apiClient.get('/api/orders/list')

  return {
    props: {
      orders: response.data
    }
  }
}