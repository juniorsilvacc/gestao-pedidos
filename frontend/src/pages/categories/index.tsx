import { useState } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from './styles.module.css';

import { BiCategory } from 'react-icons/bi';
import { FiEdit2, FiDelete } from 'react-icons/fi';

// Components
import Header from '../../components/header';
import Title from "../../components/title";

// Hooks
import { toast } from "react-toastify";

// Api
import { getAPIClient } from "../../services/axios";

type ListCategoriesProps = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

interface CategoriesProps {
  categories: ListCategoriesProps[];
}

export default function ListCategories({categories}: CategoriesProps) {
  const [categoriesList, setCategoriesList] = useState(categories || [])

  async function handleRemoveCategory(id: string){
    const api = getAPIClient(); 

    await api.delete(`/api/categories/remove/${id}`);

    alert("Deseja excluir essa categoria?")

    toast.success("Categoria excluida");

    const response = await api.get("/api/categories/list");
    setCategoriesList(response.data);
  }

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Categorias</title>
      </Head>
      <Header />
      
      <div className={styles.content}>

        <Title name="Categorias">
          <BiCategory color="#000" size={24} />
        </Title>

        <div className={styles.creationCategory}>
          <Link href="/add-category">
            Nova Categoria
          </Link>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Data</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((category) => (
              <tr key={category.id}>
                <td data-label="name">{category.name}</td>
                <td data-label="description" className={styles.description}>{category.description}</td>
                <td data-label="created_at">
                  {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(category.created_at)
                  )}
                </td>
                <td data-label="#">
                  <Link href={`/update-category/${category.id}`}>
                    <button className={styles.actionUpdate}>
                      <FiEdit2 color="#FFF" size={20} />
                    </button>
                  </Link>
                  <button className={styles.actionDelete} onClick={() => handleRemoveCategory(category.id)}>
                    <FiDelete color="#FFF" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = getAPIClient(ctx);
  const { ['@auth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const response = await api.get('/api/categories/list');

  return {
    props: {
      categories: response.data
    }
  }
}