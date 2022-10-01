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

// Modal
import ModalOrder from '../../components/modal';

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

// export type OrderItemProps = {
//   id: string;
//   amount: number
//   order_id: string;
//   product_id: string;
//   product: {
//     id: string;
//     name: string;
//     price: string;
//     description: string;
//     banner: string;
//   }
//   order: {
//     id: string;
//     table: string | number;
//     status: boolean;
//     name: string | null;
//   }
// }

export default function Dashboard({ orders }: OrdersProps) {
  const [ordersList, setOrdersList] = useState(orders || []);
  // const [ordersList, setOrdersList] = useState(orders || []);

  // const [modaItem, setModalItem] = useState<OrderItemProps[]>();
  // const [modalIsOpen, setIsOpen] = useState(false);

  // function handleCloseModal() {
  //   setIsOpen(false);
  // }

  // async function handleOpenModal(id: string) {
  //   const api = ApiClient();

  //   const response = await api.get('/api/orders/detail', {
  //     params: {
  //       order_id: id,
  //     }
  //   })

  //   setModalItem(response.data);

  //   setIsOpen(true);
  // }

  // async function handleFinishItem(id: string) {
  //   const api = ApiClient();

  //   await api.put('/api/orders/end', {
  //     order_id: id,
  //   }) 

  //   const response = await api.get('/api/orders/list');

  //   setOrdersList(response.data);

  //   setIsOpen(false);
  // }

  async function handleRefresh() {
    const api = ApiClient();

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
        
        {/* <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1 className={styles.title}>Últimos pedidos</h1>
            <button onClick={handleRefresh}>
              <FiRefreshCcw color="#EA1D2C" size={25}/>
            </button>
          </div>

          <article className={styles.orders}>

            {ordersList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModal(item.id)}>
                  <p>Nº da Mesa: { item.table }</p> 
                </button>
              </section>
            ))}

            {ordersList.length === 0 && (
              <span className={styles.empty}>Não tem pedidos</span>
            )}

          </article>
        </main> */}

        <div className={styles.content}>
          <div className={styles.title}>
            <FiHome color="#000" size={24} />
            <h1>Home</h1>
          </div>

          <div className={styles.container}>

          <div className={styles.blockRefresh}>
            <h1 className={styles.requests}>Pedidos</h1>
            <button onClick={handleRefresh}>
              <FiRefreshCcw color="#EA1D2C" size={28}/>
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

        {/* {modalIsOpen && (
          <ModalOrder
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            order={modaItem}
            handleFinishOrder={handleFinishItem}
          />
        )} */}

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
