import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { FiUpload } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';

// Styles
import styles from './styles.module.css';
import { toast } from 'react-toastify';

// Components
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Title from '../../components/Title';

// API
import api from '../../services/api';

interface ICategoryProps {
  id: string;
  name: string;
  description: string;
}

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const [imageURL, setImageURL] = useState('');
  const [imageSave, setImageSave] = useState(null);

  const [categories, setCategories] = useState<ICategoryProps[]>([] as ICategoryProps[]);
  const [categorySelected, setCategorySelected] = useState(0);

  useEffect(() => {
    async function loadsCategories() {
      api.get("/api/categories/list").then((response) => {
        setCategories(response.data);
      });
    }
    
    loadsCategories();
  }, []);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if(!image) {
      return;
    }

    if(image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
      setImageSave(image);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleChanceCategory(e) {
    setCategorySelected(e.target.value)
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    
    try {
      const data = new FormData();

      if (name === '' || price === '' || description === '' || imageSave === null) {
        return toast.warning("Preencha o campo");
      }

      data.append('image', imageSave);
      data.append('category_id', categories[categorySelected].id);
      data.append('name', name);
      data.append('price', price);
      data.append('description', description);

      await api.post("/api/products/create", data);

      setLoading(false);

      toast.success("Produto cadastrada com sucesso");

      navigate("/admin/produtos");
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar produto.");
    }
  }

  return (
    <>
      <Header />

      <div className={styles.content}>
        <Title name="Produtos">
          <BiCategory color="#000" size={24} />
        </Title>

      <main className={styles.container}>
        <h1 className={styles.title}>Criar Produto</h1>

        <div className={styles.product}>
     

          <form onSubmit={handleCreate}>
            <label className={styles.file}>
              <span>
                <FiUpload color="#EA1D2C" size={ 30 }/>
              </span>

              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFile}
              />

              {imageURL && (
                <img 
                  className={styles.preview}
                  src={imageURL} 
                  alt="Foto de Produto" 
                  width={250}
                  height={250}
                />
              )}
            </label>

            <Select value={categorySelected} onChange={handleChanceCategory} >
               {categories.map((category, index) => {
                return (
                  <option key={category.id} value={index}>
                    {category.name}
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

            <Textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
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
