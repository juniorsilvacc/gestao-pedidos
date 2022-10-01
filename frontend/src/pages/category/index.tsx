import { FormEvent, useState, ReactNode } from "react";
import Head from "next/head";
import styles from './styles.module.css';

import { BiCategory } from 'react-icons/bi';
import { FiUpload, FiDelete } from 'react-icons/fi';

// Components
import Header from '../../components/header';
import Button from '../../components/forms/Button';
import Title from "../../components/title";

// Hooks
import { toast } from "react-toastify";

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

import { ApiClient } from '../../services/api';

type ListCategoriesProps = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

interface CategoriesProps {
  categories: ListCategoriesProps[];
}


export default function Category({categories}: CategoriesProps) {
  const [categoriesList, setCategoriesList] = useState(categories || [])

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
      
      <div className={styles.content}>

        <Title name="Categorias">
          <BiCategory color="#000" size={24} />
        </Title>

        <div className={styles.creationCategory}>
          <Button
            type="submit"
            Loading={loading}
          >
            Nova Categoria
          </Button>
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
                  <button className={styles.actionUpdate}>
                    <FiUpload color="#FFF" size={20} />
                  </button>
                  <button className={styles.actionDelete}>
                    <FiDelete color="#FFF" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <main className={styles.container}>
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
        </main> */}
      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  const api = ApiClient(context);

  const response = await api.get('/api/categories/list');

  return {
    props: {
      categories: response.data
    }
  }
})
