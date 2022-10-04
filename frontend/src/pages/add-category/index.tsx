import React, { useState, FormEvent } from 'react';
import Router from 'next/router';
import Head from "next/head";
import { BiCategory } from 'react-icons/bi';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

// Components
import Header from '../../components/header';
import Title from '../../components/title';
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';

// Api
import { getAPIClient } from "../../services/axios";

export default function AddCategory() {
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

      const api = getAPIClient(); 
      await api.post("/api/categories/create", {
        name,
        description
      });

      toast.success("Categoria cadastrada");

      setLoading(false);

      Router.push("/categories");
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

      <div className={styles.content}>
       <Title name="Categorias">
          <BiCategory color="#000" size={24} />
        </Title>

        <main className={styles.container}>
          <h1 className={styles.title}>Criar Categoria</h1>
          
          <div className={styles.category}>
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
      </div>
    </>
  )
}
