import React, { FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { BiCategory } from 'react-icons/bi';

// Styles
import styles from '../add-category/styles.module.css';

// Components
import Header from '../../components/header'
import Input from '../../components/forms/Input'
import Title from '../../components/title'
import Button from '../../components/forms/Button';

// API
import { getAPIClient } from '../../services/axios';

type CategoryProps = {
  id: string;
  name: string;
  description: string;
}

interface ICategoryProps{
  categoryDate: CategoryProps | any;
} 

export default function UpdateCategory({categoryDate}: ICategoryProps) {
  const [category, setCategory] = useState(categoryDate || {});

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const api = getAPIClient();
    api.get(`/api/categories/show/${id}`).then((response) => {
      setCategory(response.data)
    });
  }, [id])

  async function handleUpdateCategory(e: FormEvent){
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Atualizar Categoria</title>
      </Head>

      <Header />

      <div className={styles.content}>
        <Title name="Categorias">
          <BiCategory color="#000" size={24} />
        </Title>

        <main className={styles.container}>
          <h1 className={styles.title}>Atualizar Categoria</h1>
          
          <div className={styles.category}>
            <form onSubmit={handleUpdateCategory}>
              <Input
                placeholder="Nome"
                type="text"
                id="name"
                name="name"
                value={category.name || ""}
                onChange={handleChange}
              />

              <Input
                placeholder="Descrição"
                type="text"
                id="description"
                name="description"
                value={category.description || ""}
                onChange={handleChange}
              />

              <Button
                type="submit"
                Loading={loading}
              >
                Atualizar
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
    }
  }
}
