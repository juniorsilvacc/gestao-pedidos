import { FormEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.css';

// Components
import Header from '../../components/header';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';

// Hooks
import { toast } from "react-toastify";

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

import { ApiClient } from '../../services/api';

export default function Category() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreateCategory(e: FormEvent) {
    try {
      e.preventDefault();
    
      if (category === '') {
        return toast.warning("Preencha o campo");
      }

      setLoading(true);

      const api = ApiClient(); 
      await api.post("/api/categories/create", {
        name: category
      });

      toast.success("Categoria cadastrada com sucesso");

      setCategory('');
      
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Cadastrar Categoria</title>
      </Head>
      <Header />
      
      <main className={styles.container}>
        <div className={styles.category}>
          <h1 className={styles.title}>Criar Categoria</h1>
          
          <form onSubmit={handleCreateCategory}>
            <Input
              placeholder="Nova Categoria"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <Button
              type="submit"
              Loading={loading}
            >
              Criar
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  return {
    props: {}
  }
})
