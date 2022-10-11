import React, { useEffect, useState } from 'react'

// Styles
import styles from './styles.module.css';

// Modal
import Modal from 'react-modal';

// Icons
import { FiRefreshCcw } from 'react-icons/fi';
import { MdOutlineFastfood } from 'react-icons/md';

// Components
import Header from '../../components/Header';
import Title from '../../components/Title';
import ModalOrder from '../../components/ModalOrder';

// API
import api from '../../services/api';

interface IOrdersProps {
  id: string;
  name: string | null;
  table: string | number;
  status: boolean;
  draft: boolean;
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
  }
  order: {
    id: string;
    name: string | null;
    table: string | number;
    status: boolean;
  }
}

export default function Dasboard() {
  const [orders, setOrders] = useState<IOrdersProps[]>([] as IOrdersProps[]);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function loadsOrders() {
      api.get("/api/orders/list").then((response) => {
        setOrders(response.data);
      });
    }
    
    loadsOrders();
  }, []);

  async function handleOpenModalView(id: string) {
    const response = await api.get("/api/orders/detail", {
      params: {
        order_id: id,
      }
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  function handleCloseModalView() {
    setModalVisible(false);
  }

  Modal.setAppElement('#root');

  return (
    <>
      <div>
        <Header />

        <div className={styles.content}>
          
          <Title name="Pedidos">
            <MdOutlineFastfood color="#000" size={24} />
          </Title>

          <div className={styles.container}>

          <div className={styles.blockRefresh}>
            <h1 className={styles.title}>Pedidos</h1>
            <button>
              <FiRefreshCcw color="#EA1D2C" size={22}/>
            </button>
          </div>

          <article className={styles.orders}>
            {orders.map((order) => (
              <section key={order.id} className={styles.orderItem}>
                <button onClick={ () => handleOpenModalView(order.id)}> 
                  <div className={styles.tag}>
                    <span>Nº da Mesa: <b>{order.table}</b></span>
                  </div>
                </button>
              </section>
            ))}
            

            {orders.length === 0 && (
              <span className={styles.empty}>Não há pedidos</span>
            )}
          </article>

          </div>
        </div>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModalView}
            order={modalItem}
          />
        )}

      </div>
    </>
  )
}
