import React, { useState } from "react";
import Head from "next/head";
import styles from "./styles.module.css";
import Modal from 'react-modal';
import { FiRefreshCcw } from 'react-icons/fi';

// Components
import Header from '../../components/header';

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

// api
import { ApiClient } from '../../services/api';

// Modal
import ModalOrder from '../../components/modal';

type ListOrdersProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface OrdersProps {
  ordersList: ListOrdersProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ ordersList }: OrdersProps) {
  const [orders, setOrders] = useState(ordersList || []);

  const [modaItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalIsOpen, setIsOpen] = useState(false);

  async function handleOpenModal(id: string) {
    const api = ApiClient();

    const response = await api.get('/api/orders/detail', {
      params: {
        order_id: id,
      }
    })

    setModalItem(response.data);
    console.log(response.data)
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Dashboard</title>
      </Head>
      <div>
        <Header />
        
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1 className={styles.title}>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw color="#EA1D2C" size={25}/>
            </button>
          </div>

          <article className={styles.orders}>

            {ordersList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModal(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa { item.table }</span>
                </button>
              </section>
            ))}

          </article>
        </main>

        {setIsOpen && (
          <ModalOrder
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            order={modaItem}
          />
        )}

      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  const api = ApiClient(context)

  const response = await api.get("/api/orders/list");

  return {
    props: {
      ordersList: response.data
    }
  }
})
