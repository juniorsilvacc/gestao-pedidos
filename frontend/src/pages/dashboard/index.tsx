import Head from "next/head";
import styles from "./styles.module.css";
import { FiRefreshCcw } from 'react-icons/fi'

// Components
import Header from '../../components/header';

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

export default function dashboard() {
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

            <section className={styles.orderItem}>
              <button>
                <div className={styles.tag}></div>
                <span>Mesa 10</span>
              </button>
            </section>

          </article>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  return {
    props: {}
  }
})
