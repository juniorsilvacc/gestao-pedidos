import React, { useState } from "react";
import Head from "next/head";
import styles from "./styles.module.css";
import Modal from 'react-modal';

// Icons
import { FiHome, FiRefreshCcw } from 'react-icons/fi';

// Components
import Header from '../../components/header';

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

// Api
import { ApiClient } from '../../services/api';

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

  // async function handleRefresh() {
  //   const api = ApiClient();

  //   const response = await api.get('/api/orders/list')

  //   setOrdersList(response.data);
  // }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Dashboard</title>
      </Head>
      <div>
        <Header />

        <div className={styles.content}>
          <div className={styles.title}>
            <FiHome color="#000" size={24} />
            <h1>Home</h1>
          </div>

          <div className={styles.container}>

          <div className={styles.blockRefresh}>
            <h1 className={styles.requests}>Pedidos</h1>
            {/* <button onClick={handleRefresh}>
              <FiRefreshCcw color="#EA1D2C" size={28}/>
            </button> */}
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

export const getServerSideProps = SSRAuth(async (context) => {
  const api = ApiClient(context)

  const response = await api.get("/api/orders/list");

  return {
    props: {
      orders: response.data
    }
  }
})
