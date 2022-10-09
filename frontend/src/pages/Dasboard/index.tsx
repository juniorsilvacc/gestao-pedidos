import React, { useEffect, useState } from 'react'

// Styles
import styles from './styles.module.css';

// Icons
import { FiRefreshCcw } from 'react-icons/fi';
import { MdOutlineFastfood } from 'react-icons/md';

// Components
import Header from '../../components/Header';
import Title from '../../components/Title';

// API
import api from '../../services/api';

interface IOrdersProps {
  id: string;
  name: string | null;
  table: string | number;
  status: boolean;
  draft: boolean;
}

export default function Dasboard() {
  const [orders, setOrders] = useState<IOrdersProps[]>([] as IOrdersProps[]);

  useEffect(() => {
    async function loadsCategories() {
      api.get("/api/orders/list").then((response) => {
        setOrders(response.data);
      });
    }
    
    loadsCategories();
  }, []);

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
          {orders.map(order => (
            <section key={order.id} className={styles.orderItem}>
              <button>
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
      </div>
    </>
  )
}
