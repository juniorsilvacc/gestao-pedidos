import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.css';
import { FiUpload } from 'react-icons/fi';

// Components
import Header from '../../components/header';
import Select from '../../components/forms/Select';
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
  description: string;
}

interface CategoryProps {
  categoryList: ListProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [imgProductURL, setImgProductURL] = useState('');
  const [imgPreview, setImgPreview] = useState(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelect, setCategorySelect] = useState(0);

  function handlePreview(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if(!image) {
      return;
    }

    if (image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
      setImgPreview(image);
      setImgProductURL(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();

    try {
      const data = new FormData();

      if (name === '' || price === '' || description === '' || imgPreview === null) {
        return toast.warning("Preencha o campo");
      }

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[categorySelect].id)
      data.append('image', imgPreview)

      const api = ApiClient();
      await api.post("/api/products/create", data);
      
      toast.success("Produto cadastrada com sucesso");

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }

    setImgProductURL('');
    setImgPreview(null);
    setName('');
    setPrice('');
    setDescription('');
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
            <label className={styles.file}>
              <span>
                <FiUpload color="#EA1D2C" size={ 30 }/>
              </span>

              <input
                type="file"
                accept='image/png, image/jpeg, image/jpg'
                onChange={handlePreview}
              />

              {imgProductURL && (
                <img
                  className={styles.preview}
                  src={imgProductURL}
                  alt="Foto Produto"
                  width={250}
                  height={250}
                />
              )}
            </label>
            
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextArea
              placeholder="Descrição"
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
  // const api = ApiClient(context); 

  // const response = await api.get("/api/categories/list");
  
  return {
    props: {
      // categoryList: response.data
    }
  }
})
