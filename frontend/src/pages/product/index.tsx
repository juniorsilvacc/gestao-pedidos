import { FormEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.css';

// Components
import Header from '../../components/header';
import Select from '../../components/forms/Select';
import File from '../../components/forms/File';
import TextArea from "../../components/forms/TextArea";
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';

// Hooks
import { toast } from "react-toastify";

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

import { ApiClient } from '../../services/api';

type ListProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ListProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelect, setCategorySelect] = useState(0)

  const [nameItem, setNameItem] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();  
  }

  // Selecionar nova categoria
  function handleSelectCategory(e: any) {
    setCategorySelect(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Cadastrar Produto</title>
      </Head>
      <Header />

      <main className={styles.container}>
        <div className={styles.product}>
          <h1 className={styles.title}>Criar Produto</h1>

          <form onSubmit={handleCreateProduct}>
            <File />
            
            <Select value={categorySelect} onChange={handleSelectCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </Select>
            
            <Input
              type="text"
              placeholder="Produto"
            />

            <Input
              type="text"
              placeholder="Preço"
            />

            <TextArea
              placeholder="Descrição"
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
  const api = ApiClient(context); 

  const response = await api.get("/api/categories/list");
  
  return {
    props: {
      categoryList: response.data
    }
  }
})
