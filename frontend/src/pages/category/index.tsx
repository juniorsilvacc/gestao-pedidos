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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleCreateCategory(e: FormEvent) {
    e.preventDefault();
    
    try {
      if (name === '' || description === '') {
        return toast.warning("Preencha os campo");
      }

      setLoading(true);

      const api = ApiClient(); 
      await api.post("/api/categories/create", {
        name,
        description
      });

      toast.success("Categoria cadastrada com sucesso");

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }

    setName('');
    setDescription('');
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
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Descrição"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type="submit"
              Loading={loading}
            >
              Cadastrar
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
